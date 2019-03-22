module.exports = async (_, args, ctx, info) => {
  // get existing cart items
  const [existingCartItem] = await ctx.prisma.cartItems({
    where: {
      user: { id: ctx.userId },
      product: { id: args.id }
    }
  })

  // if item is in cart send error
  if (existingCartItem) throw new Error('product already in cart')

  // create new cart item, add it to cart, return cart item
  return ctx.prisma.createCartItem({
    user: {
      connect: {
        id: ctx.userId
      }
    },
    product: {
      connect: {
        id: args.id
      }
    }
  })
}
