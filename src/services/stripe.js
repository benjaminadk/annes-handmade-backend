const secret =
  process.env.NODE_ENV === 'development'
    ? process.env.STRIPE_SECRET_DEV
    : process.env.STRIPE_SECRET_PROD

module.exports = require('stripe')(secret)
