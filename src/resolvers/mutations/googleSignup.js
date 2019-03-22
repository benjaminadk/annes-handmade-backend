const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const { transport, makeTempPass } = require('../../services/email')
const signToken = require('../utils/signToken')
const createCookie = require('../utils/createCookie')

module.exports = async (_, args, ctx, info) => {
  // use googleId to check if user is in database
  const googleId = args.data.googleId
  const user = await ctx.prisma.user({ googleId })

  // if no user create new user
  if (!user) {
    // give user random password
    const password = uuid()
      .slice(0, 10)
      .replace(/-/g, '')
    const hashedPassword = await bcrypt.hash(password, 10)

    // create with 'USER' role
    const newUser = await ctx.prisma.createUser({
      ...args.data,
      password: hashedPassword,
      role: 'USER'
    })

    // send email to give user temp password
    const html = await makeTempPass(newUser.email, password)
    await transport.sendMail({
      from: 'annes-handmade@gmail.com',
      to: newUser.email,
      subject: `Anne's Handmade Sign Up`,
      html
    })

    // create token
    const token = signToken(newUser.id)

    // create cookie
    createCookie(ctx.res, token)
    return newUser
  } else {
    const token = signToken(user.id)
    createCookie(ctx.res, token)
    return user
  }
}
