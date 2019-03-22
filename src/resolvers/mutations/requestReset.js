const { promisify } = require('util')
const { randomBytes } = require('crypto')
const { transport, makeResetPass } = require('../../services/email')
const validateInput = require('../utils/validateInput')

const randomBytesAsync = promisify(randomBytes)

module.exports = async (_, args, ctx, info) => {
  // validate email
  validateInput('request-reset', args)

  // find user with email
  const user = await ctx.prisma.user({ email: args.email.toLowerCase() })

  // if no user throw error
  if (!user) throw new Error(`no user for email ${args.email}`)

  // create temporary token valid for 1 hour
  const resetToken = (await randomBytesAsync(20)).toString('hex')
  const resetTokenExpiry = Date.now() + 3600000

  // add token to user
  await ctx.prisma.updateUser({
    where: { email: args.email.toLowerCase() },
    data: { resetToken, resetTokenExpiry }
  })

  // send user email with link to reset page
  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Password Reset Request',
    html: await makeResetPass(resetToken)
  })

  // return message to frontent
  return { success: true, message: `email sent to ${args.email}` }
}
