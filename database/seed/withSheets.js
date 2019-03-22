require('dotenv').config()
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readline = require('readline')
const seed = require('./seed')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// reach out to google sheets api to fetch data
module.exports = async () => {
  authorize(getSpreadSheet)
}

// store token.json credentials locally, can renew when needed
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(__dirname, 'token.json')

// supply google api credentials
async function authorize(callback) {
  const sheetsAPI = new google.auth.OAuth2(
    process.env.GOOGLE_SHEET_ID,
    process.env.GOOGLE_SHEET_SECRET,
    process.env.GOOGLE_SHEET_REDIRECT
  )

  // read token.json and set credential
  try {
    const token = await readFile(TOKEN_PATH)
    sheetsAPI.setCredentials(JSON.parse(token))
    callback(sheetsAPI)
  } catch (error) {
    getNewToken(sheetsAPI, callback)
  }
}

// supply spreadsheet id and range
// call seed function and slice first row which is column titles in this case
async function getSpreadSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const getSheet = promisify(sheets.spreadsheets.values.get)
  try {
    const response = await getSheet({
      spreadsheetId: '1ZYHxOPm600Bnnwd-d2d4tghpn0MAl_jEpewBV8gg-fM',
      range: 'Sheet1'
    })
    if (response) {
      seed(response.data.values.slice(1))
    }
  } catch (error) {
    console.log('The API returned an error: ' + error)
  }
}

// prints link to authorization site, open site to get token
// paste token to cli and it gets saved to token.json
function getNewToken(sheetsAPI, callback) {
  const authUrl = sheetsAPI.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    sheetsAPI.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      sheetsAPI.setCredentials(token)
      try {
        writeFile(TOKEN_PATH, JSON.stringify(token))
        callback(sheetsAPI)
      } catch (error) {
        console.error(error)
      }
    })
  })
}
