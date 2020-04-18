const CredentialManager = require("../lib/credential-manager");
const inquirer  = require("inquirer") 
const util = require("../lib/util")
const Twits = require('../lib/twit')
const querystring = require('querystring')
const opn = require("opn")
//const opn = require('opn') 

const configure = {
   async consumer(name){
      let creds = new CredentialManager(name);
      let answers = await inquirer.prompt([
         {
            type : 'input',
            name : 'key',
            meassage : 'Enter the twitter Api key',
            validate : util.notEmpty()
         },
         {
            type : 'input',
            name : 'secret',
            meassage : 'Enter the twitter Api secret',
            validate : util.notEmpty()
         }
      ])
      await creds.storeKeyAndSceret('consumer',answers.key,answers.secret)
   },
   
   //command to get the up twitter account authorisation using pinbased and OAuth-1.0a
   //see documentation for more details
   //it is 3 step procedure
   async account(name){
      let creds = new CredentialManager(name)
      var [apiKey, apiSecret] =await creds.getKeyAndSecret('consumer')
      let twits = new Twits(apiKey,apiSecret)
      //console.log(twits.baseUrl)
      let response = querystring.parse(await twits.post('oauth/request-token'))
      console.log('aditya');
      twits.setToken(response['oauth_token'],response['oauth_token_secret'])
     await inquirer.prompt({
        type : 'input',
        name : 'continue',
        message : 'Press enter to open the browser to authorize access'
     })

     util.openBrowser(`${twits.baseUrl}oauth/authorize?oauth_token=${response['oauth_token']}`)
     let answer = await inquirer.prompt({
        type : 'input',
        name : 'pin',
        validate : util.notEmpty()
     })

     let tokenResponse = querystring.parse(
        await twits.post('oauth/access-token',`oauth-verifier=${answer['pin']}`)
     )
     twits.setToken(tokenResponse['oauth_token'],tokenResponse['oauth_token_secret'])

     let verifyResponse = await twits.get('1.1/account/verify_credentials.json')
     await creds.storeKeyAndSecret(
        'account',
        tokenResponse['oauth_token'],
        tokenResponse['oauth_token_secret']
     )

     console.log(`Account ${verifyResponse['screen_name']} successfully added`)
   } 
}

module.exports = configure