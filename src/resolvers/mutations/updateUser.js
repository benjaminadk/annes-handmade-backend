const validateInput = require('../utils/validateInput')

module.exports = async (_, args, ctx, info) => {
  validateInput('user', args)
  try {
    const user = await ctx.prisma.updateUser({
      where: { id: args.id },
      data: { name: args.name, email: args.email }
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
