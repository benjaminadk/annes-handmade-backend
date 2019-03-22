const stripe = require('../../services/stripe')
const { transport, makeReciept } = require('../../services/email')
const sendTextMessage = require('../../services/twilio')
const OrderWithItems = require('../../fragments/OrderWithItems')

module.exports = async (_, args, ctx, info) => {
  // get user from context
  const user = ctx.user

  // if no user throw error
  if (!user) {
    throw new Error('user must be logged in')
  }

  // calculate the total cost or order
  const amount = user.cart.reduce((acc, cartItem) => {
    acc += parseInt(cartItem.product.price * 1.08, 10)
    return acc
  }, 0)

  // generate description for stripe reciept, list of product titles
  const stripeDescription = user.cart.map(cartItem => `${cartItem.product.title}`).join(', ')

  // create the stripe charge, include user id in stripe metadata
  const charge = await stripe.charges.create({
    amount,
    currency: 'USD',
    source: args.token,
    description: stripeDescription,
    metadata: { user: user.id }
  })

  // convert the cart items to order items
  const orderItems = user.cart.map(cartItem => {
    const { title, description, price, images, variant, bead } = cartItem.product
    return {
      title,
      description,
      price,
      images: { set: images },
      variant,
      bead,
      user: { connect: { id: user.id } }
    }
  })

  // create the order, order items and address
  const order = await ctx.prisma
    .createOrder({
      total: charge.amount,
      charge: charge.id,
      shipping: { create: { ...args.data } },
      items: { create: orderItems },
      user: { connect: { id: user.id } }
    })
    .$fragment(OrderWithItems)

  // gather product ids, cart item ids, and products to help clean up
  let productIds = []
  let products = []
  let cartItemIds = []
  user.cart.forEach(cartItem => {
    productIds.push(cartItem.product.id)
    products.push(cartItem.product)
    cartItemIds.push(cartItem.id)
  })

  // update products to sold = true so they won't be resold
  await ctx.prisma.updateManyProducts({ where: { id_in: productIds }, data: { sold: true } })

  // delete cart items for user cart
  await ctx.prisma.deleteManyCartItems({ id_in: cartItemIds })

  // email reciept to user
  const html = await makeReciept(products, order.id)
  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `Anne's Handmade Order`,
    html
  })

  // send text message to business owner with sale amount
  await sendTextMessage(charge.amount)

  // return the Order
  return order
}
