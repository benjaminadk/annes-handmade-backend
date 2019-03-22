const { prisma } = require('../generated')
const UserWithCart = require('../fragments/UserWithCart')

module.exports = async (req, res, next) => {
  const id = req.userId
  if (!id) {
    return next()
  }
  const user = await prisma.user({ id }).$fragment(UserWithCart)
  req.user = user
  next()
}
