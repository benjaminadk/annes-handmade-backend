const roles = ['USER', 'ADMIN']

const isAuthenticated = async (_, args, ctx, info) => {
  if (!ctx.userId) throw new Error('not authorized. please sign in')
  if (!roles.includes(ctx.user.role)) throw new Error('invalid permissions')
}

const isAdmin = async (_, args, ctx, info) => {
  if (!ctx.userId) throw new Error('not authorized. please sign in.')
  if (ctx.user.role !== 'ADMIN') throw new Error('invalid permissions')
}

module.exports = {
  isAuthenticated,
  isAdmin
}
