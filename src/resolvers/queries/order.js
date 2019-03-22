const OrderWithItems = require('../../fragments/OrderWithItems')

module.exports = async (_, args, ctx, info) => {
  if (!args.id) throw new Error('order id is required')
  const order = await ctx.prisma.order({ id: args.id }).$fragment(OrderWithItems)
  if (!order) throw new Error(`order with id: ${args.id} does not exist`)
  return order
}
