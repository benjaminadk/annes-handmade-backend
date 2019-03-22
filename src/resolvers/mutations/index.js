const { combineResolvers } = require('graphql-resolvers')
const { isAdmin, isAuthenticated } = require('../permissions')

// combineResolvers add permissions layer
// isAuthenticated requires a user to be logged in with valid cookie
// isAdmin requires role of ADMIN and valid cookie
module.exports = {
  signup: require('./signup'),
  googleSignup: require('./googleSignup'),
  signin: require('./signin'),
  signout: require('./signout'),
  requestReset: require('./requestReset'),
  resetPassword: require('./resetPassword'),
  updateUser: require('./updateUser'),
  createProduct: combineResolvers(isAdmin, require('./createProduct')),
  updateProduct: combineResolvers(isAdmin, require('./updateProduct')),
  deleteProduct: combineResolvers(isAdmin, require('./deleteProduct')),
  addImage: combineResolvers(isAdmin, require('./addImage')),
  deleteImage: combineResolvers(isAdmin, require('./deleteImage')),
  addImageUser: combineResolvers(isAuthenticated, require('./addImageUser')),
  deleteImageUser: combineResolvers(isAuthenticated, require('./deleteImageUser')),
  addToCart: combineResolvers(isAuthenticated, require('./addToCart')),
  removeFromCart: combineResolvers(isAuthenticated, require('./removeFromCart')),
  createOrder: combineResolvers(isAuthenticated, require('./createOrder')),
  toggleShipped: combineResolvers(isAdmin, require('./toggleShipped'))
}
