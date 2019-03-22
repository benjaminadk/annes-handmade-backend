module.exports = async (_, args, ctx, info) =>
  await ctx.prisma.updateProduct({ where: { id: args.id }, data: args.data })
