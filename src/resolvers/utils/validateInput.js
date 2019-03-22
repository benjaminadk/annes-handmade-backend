const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = (mode, args) => {
  if (mode === 'signup') {
    if (!args.name) throw new Error('name is required')
    if (args.name.length < 2) throw new Error('name must be 3 characters')
    if (!args.email) throw new Error('email is required')
    if (!emailRegex.test(args.email)) throw new Error('invalid email')
    if (!args.password) throw new Error('password is required')
    if (args.password.length < 8) throw new Error('password must be 8 characters')
  } else if (mode === 'signin') {
    if (!args.email) throw new Error('email is required')
    if (!emailRegex.test(args.email)) throw new Error('invalid email')
    if (!args.password) throw new Error('password is required')
    if (args.password.length < 8) throw new Error('password must be 8 characters')
  } else if (mode === 'user') {
    if (!args.name) throw new Error('name is required')
    if (args.name.length < 2) throw new Error('name must be 3 characters')
    if (!args.email) throw new Error('email is required')
    if (!emailRegex.test(args.email)) throw new Error('invalid email')
  } else if (mode === 'request-reset') {
    if (!args.email) throw new Error('email is required')
    if (!emailRegex.test(args.email)) throw new Error('invalid email')
  } else if (mode === 'reset-password') {
    if (!args.password) throw new Error('password is required')
    if (!args.confirmPassword) throw new Error('confirm password is required')
    if (args.password.length < 8) throw new Error('password must be 8 characters')
    if (args.password !== args.confirmPassword) throw new Error('password mismatch')
    if (args.pwd < 3) throw new Error('password quality too low')
  } else if (mode === 'product') {
    if (!args.title) throw new Error('title is required')
    if (!args.description) throw new Error('description is required')
    if (!args.price) throw new Error('price is required')
    if (!args.variant) throw new Error('variant is required')
    if (!args.bead) throw new Error('bead is required')
    if (!args.set || !args.set.images.length) throw new Error('image is required')
  }
}
