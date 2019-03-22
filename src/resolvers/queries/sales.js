const OrderWithItems = require('../../fragments/OrderWithItems')

module.exports = async (_, args, ctx, info) => await ctx.prisma.orders().$fragment(OrderWithItems)
