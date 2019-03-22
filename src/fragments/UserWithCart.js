module.exports = `
  fragment UserWithCart on User {
    id
    name
    email
    image
    role
    cart {
      id
      product {
        id
        title
        description
        images
        price
        variant
        bead
      }
    }
    orders {
      id
      charge
      total
      shipped
      createdAt
      items {
        id
        images
      }
    }
  }
`
