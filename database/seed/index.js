const readline = require('readline')
const withCSV = require('./withCSV')
const withSheets = require('./withSheets')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// use readline to give user option to seed with csv file or google sheets api
function getSeedOption() {
  rl.question('Seed database with CSV file or from Sheets API? (csv/ss) ', choice => {
    rl.close()
    if (choice === 'csv') {
      withCSV()
    } else if (choice === 'ss') {
      withSheets()
    } else {
      console.log('Enter one of the choices dum dum. "csv" or "ss" 😀')
    }
  })
}

getSeedOption()
