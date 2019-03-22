const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

// set up email client based on environment
const isDev = process.env.NODE_ENV === 'development'

// use mailtrap in development
const devOptions = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

// use sendgrid in production
const prodOptions = {
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
}

// create transport
const transport = nodemailer.createTransport(isDev ? devOptions : sgTransport(prodOptions))

module.exports = {
  transport,
  makeReciept: require('./makeReciept'),
  makeResetPass: require('./makeResetPass'),
  makeTempPass: require('./makeTempPass')
}
