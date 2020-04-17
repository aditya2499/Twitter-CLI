const opn = require('opn')

const openBrowser = (url) =>opn(url,{wait : false})

const notEmpty = (input) =>(
   input === '' ? 'This value is required' : true
)

module.exports = { notEmpty, openBrowser }