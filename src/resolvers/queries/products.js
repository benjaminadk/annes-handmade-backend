module.exports = async (_, args, ctx, info) => await ctx.prisma.products({ ...args })
