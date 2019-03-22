const isDev = process.env.NODE_ENV === 'development'

// make link for homepage, order page or reset password page
module.exports = (text, id, resetToken) => {
  const rootUrl = isDev ? process.env.FRONTEND_DEV : process.env.FRONTEND_PROD
  if (id) {
    return `<a href="${rootUrl}/order?id=${id}">${text}</a>`
  } else if (resetToken) {
    return `<a href="${rootUrl}/reset?resetToken=${resetToken}">${text}</a>`
  } else {
    return `<a href="${rootUrl}">${text}</a>`
  }
}
