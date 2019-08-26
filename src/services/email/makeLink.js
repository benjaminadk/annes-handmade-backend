// make link for homepage, order page or reset password page
module.exports = (text, id, resetToken) => {
  const rootUrl =
    process.env.NODE_ENV === 'development' ? process.env.FRONTEND : 'http://anneshandmade.com'
  if (id) {
    return `<a href="${rootUrl}/order?id=${id}">${text}</a>`
  } else if (resetToken) {
    return `<a href="${rootUrl}/reset?resetToken=${resetToken}">${text}</a>`
  } else {
    return `<a href="${rootUrl}">${text}</a>`
  }
}
