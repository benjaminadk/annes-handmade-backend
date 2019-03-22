module.exports = async (_, args, ctx, info) => {
  const count = await ctx.prisma
    .productsConnection({ ...args })
    .aggregate()
    .count()
  return { count }
}
