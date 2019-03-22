module.exports = async (_, args, ctx, info) => {
  const product = await ctx.prisma.product({ ...args })
  if (!product) {
    throw new Error(`product with id: ${args.id} does not exist.`)
  }
  return product
}
