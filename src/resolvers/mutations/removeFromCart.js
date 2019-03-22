const CartItemWithUser = require('../../fragments/CartItemWithUser')

module.exports = async (_, args, ctx, info) => {
  // find the cart item
  const cartItem = await ctx.prisma.cartItem({ ...args }).$fragment(CartItemWithUser)

  // if no item throw error
  if (!cartItem) throw new Error('no cart item found')

  // make sure user owns that cart item
  if (cartItem.user.id !== ctx.userId) throw new Error('user does not own cart item')

  // delete cart item, return cart item
  return ctx.prisma.deleteCartItem({ ...args })
}
