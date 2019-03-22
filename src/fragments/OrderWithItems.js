module.exports = `
  fragment OrderWithItems on Orders {
    id
    charge
    total
    shipped
    createdAt
    shipping {
      id
      name
      street
      city
      state
      zip
    }
    user {
      id
      name
      email
      image
    }
    items {
      id
      title
      description
      images
      price
      variant
      bead
    }
  }
`
