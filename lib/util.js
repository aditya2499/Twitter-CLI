const opn = require('opn')
const chalk = require('chalk')


const openBrowser = (url) =>opn(url,{wait : false})

const notEmpty = (input) =>(
   input === '' ? 'This value is required' : true
)

const handleError = (message) =>{
   console.error(chalk.redBright(message))
   process.exitCode=1;
}

module.exports = { notEmpty, openBrowser,handleError }