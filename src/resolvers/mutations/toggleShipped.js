module.exports = async (_, args, ctx, info) => {
  // toggle shipped status of order
  await ctx.prisma.updateOrder({
    where: { id: args.id },
    data: { shipped: !args.shipped }
  })
  return { message: 'changed order shipped status' }
}
