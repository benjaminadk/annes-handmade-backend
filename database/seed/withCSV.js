require('dotenv').config()
const parse = require('csv-parse')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const seed = require('./seed')

const readFile = promisify(fs.readFile)
const parseAsync = promisify(parse)

// path to local csv file
const filepath = path.join(__dirname, 'data.csv')

// read, parse and send to seed function
module.exports = async () => {
  const raw = await readFile(filepath)
  const parsed = await parseAsync(raw)
  await seed(parsed.slice(1))
}
