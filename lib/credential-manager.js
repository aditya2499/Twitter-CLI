const Configstore = require("configstore")
const inquirer = require("inquirer")
const keytar = require("keytar");
class CredentialManager{
   //uses the name to name the JSON file that store the configuration data
   constructor (name){
      this.config = new Configstore(name);
      //console.log("created")
      this.service = name
   }

   async getKeyAndSecret (){
      let key = this.config.get("apiKey");
      if(key){
         let secret = await keytar.getPassword(this.service,key);
         return [key,secret];
      }
      else{
        let answers = await inquirer.prompt([
           {type : 'input' , name : "key" , message : 'Enter the twitter api key'},
           {type : 'password', name : "secret", message : 'Enter the twitter api secret'}
        ])
        this.config.set('apiKey',answers.key );
        await keytar.setPassword(this.service, answers.key,answers.secret)
        return [answers.key,answers.secret];
      }
   }
}

module.exports =  CredentialManager