const validateInput = require('../utils/validateInput')

module.exports = async (_, args, ctx, info) => {
  validateInput('user', args.data)
  try {
    const user = await ctx.prisma.updateUser({
      where: { id: args.id },
      data: args.data
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
