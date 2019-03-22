module.exports = async (_, args, ctx, info) => {
  ctx.res.clearCookie(process.env.COOKIE)
  return { message: 'user signed out' }
}
