const bcrypt = require('bcryptjs')
const validateInput = require('../utils/validateInput')
const createCookie = require('../utils/createCookie')
const signToken = require('../utils/signToken')

module.exports = async (_, args, ctx, info) => {
  // validate email, password
  validateInput('signin', args)

  // check if there is a user with that email
  const user = await ctx.prisma.user({ email: args.email.toLowerCase() })

  // if no user throw error
  if (!user) throw new Error(`no user for email ${args.email}`)

  // check if password is matches database
  const valid = await bcrypt.compare(args.password, user.password)

  // if no match throw error
  if (!valid) throw new Error('invalid password')

  // create token
  const token = signToken(user.id)

  // create cookie
  createCookie(ctx.res, token)

  // return user
  return user
}
