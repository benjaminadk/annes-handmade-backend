module.exports = `
  fragment CartItemWithUser on CartItem {
    id
    user {
      id
    }
  }
`
