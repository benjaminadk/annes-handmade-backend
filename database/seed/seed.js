require('dotenv').config()
const axios = require('axios')
const bcrypt = require('bcryptjs')

function formatText(str) {
  const arr = str.replace('_', ' ').split(' ')
  return arr.map(el => el.charAt(0).toUpperCase() + el.substr(1).toLowerCase()).join(' ')
}

async function sendData(data) {
  await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
    },
    url: `${process.env.PRISMA_ENDPOINT}/import`,
    data
  })
}

module.exports = async rows => {
  const date = new Date().toISOString()

  const admin = {
    _typeName: 'User',
    id: 'cjp95jm196vs20a36myq2xcyg',
    name: 'Admin',
    email: 'benjaminadk@gmail.com',
    password: await bcrypt.hash('password', 10),
    googleId: '117803716222757935095',
    role: 'ADMIN',
    image:
      'https://lh4.googleusercontent.com/-9Q_OGPy0Reg/AAAAAAAAAAI/AAAAAAAAADw/_7zKKUkqOlQ/photo.jpg?sz=50',
    createdAt: date
  }

  const nodes = rows.map((el, index) => ({
    _typeName: 'Product',
    id: index.toString(),
    title: formatText(el[0]),
    variant: el[1].toUpperCase(),
    bead: el[2].toUpperCase().replace(' ', '_'),
    price: Number(el[3]),
    description: el[4],
    sold: false,
    createdAt: date
  }))

  const lists = rows.map((el, index) => {
    const images = el[5].split(',').map(img => img.trim())
    return {
      _typeName: 'Product',
      id: index.toString(),
      images
    }
  })

  const NODES = { valueType: 'nodes', values: [...nodes, admin] }
  const LISTS = { valueType: 'lists', values: lists }

  try {
    await sendData(NODES)
    await sendData(LISTS)
  } catch (error) {
    console.error('Error importing data to prisma: ', error)
  } finally {
    console.log('Prisma database seeded')
  }
}
