const bcrypt = require('bcryptjs')
const validateInput = require('../utils/validateInput')
const createCookie = require('../utils/createCookie')
const signToken = require('../utils/signToken')

module.exports = async (_, args, ctx, info) => {
  // validate email, name, password args
  validateInput('signup', args)

  // hash password
  const password = await bcrypt.hash(args.password, 10)

  // create user, normalize email, role is USER
  const user = await ctx.prisma.createUser({
    name: args.name,
    email: args.email.toLowerCase(),
    password,
    role: 'USER'
  })

  // create token
  const token = signToken(user.id)

  // create cookie with token inside, sent with all requests
  createCookie(ctx.res, token)

  // return user
  return user
}
