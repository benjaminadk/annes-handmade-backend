const validateInput = require('../utils/validateInput')

module.exports = async (_, args, ctx, info) => {
  validateInput('product', args.data)
  const product = await ctx.prisma.createProduct({ ...args.data })
  return product
}
