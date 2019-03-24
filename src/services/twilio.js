const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
const formatMoney = require('../resolvers/utils/formatMoney')

// send sms text message to admin cell phone when order is placed
module.exports = async total => {
  client.messages
    .create({
      body: `Hey. We just received a new order @ Anne's Handmade. Total: ${formatMoney(total)}`,
      to: process.env.ADMIN_PHONE,
      from: process.env.TWILIO_PHONE
    })
    .then(message => console.log('text message sent to admin'))
    .catch(console.log)
}
