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
      let key , secret
      let envKeyName= `${this.service.toUpperCase()}_${prop.toUpperCase()}_KEY`
      if(envKeyName in process.env){
         key = process.env[envKeyName]
      }
      else{
         key = this.config.get(`keys.${prop}`);
      }
      if(!key){
         throw new Error(`Missing ${prop} key -- Have you tried to run configure ${prop}`);
      }
      let envSecretName= `${this.service.toUpperCase()}_${prop.toUpperCase()}_SECRET`
      if(envSecretName in process.env){
         secret = process.env[envSecretName]
      }
      else{
         secret = await keytar.getPassword(this.service,key)
      }  
      if(!secret){
         throw new Error(`Missing ${prop} secret -- Have you tried to run configure ${prop}`)
      }
      return [key,secret];
   }

   async storeKeyAndSecret(prop,key , secret){
      this.config.set(`keys.${prop}`,key)
      await keytar.setPassword(this.service,key,secret)
   }
}

module.exports =  CredentialManager