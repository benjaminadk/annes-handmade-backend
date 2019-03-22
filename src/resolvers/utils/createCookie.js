// cookie is valid for one year
module.exports = (res, token) => {
  res.cookie(process.env.COOKIE, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
}
