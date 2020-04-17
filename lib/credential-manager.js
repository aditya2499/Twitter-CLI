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

   async getKeyAndSecret (prop){
      let key = this.config.get(prop);
      if(!key){
         throw new Error('Api key is not found');
      }
      let secret = await keytar.getPassword(this.service,key) 
   }

   async storeKeyAndSecret(prop,key , secret){
      this.config.set(prop,key)
      await keytar.setPassword(this.service,key,secret)
   }
}

module.exports =  CredentialManager