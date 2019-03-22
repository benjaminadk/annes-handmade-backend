const bcrypt = require('bcryptjs')
const signToken = require('../utils/signToken')
const createCookie = require('../utils/createCookie')
const validateInput = require('../utils/validateInput')

module.exports = async (_, args, ctx, info) => {
  // validate input
  validateInput('reset-password', args)

  // destructure users query
  // finding first user with resetToken match and valid expiration date
  const [user] = await ctx.prisma.users({
    where: { resetToken: args.resetToken, resetTokenExpiry_gte: Date.now() - 3600000 }
  })

  // if no user throw error
  if (!user) throw new Error('expired or invalid token')

  // hash new password
  const password = await bcrypt.hash(args.password, 10)

  // update user's password property
  const updatedUser = await ctx.prisma.updateUser({
    where: { email: user.email },
    data: { password, resetToken: null, resetTokenExpiry: null }
  })

  // sign token
  const token = signToken(updatedUser.id)

  // create cookie
  createCookie(ctx.res, token)

  // return updated user
  return updatedUser
}
