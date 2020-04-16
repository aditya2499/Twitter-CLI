#!/usr/bin/env node

const CredentialManager = require("../lib/credential-manager")

async function main(){
   const creds = new CredentialManager('twitter')
   let [key , secret] = await creds.getKeyAndSecret();
   console.log(key,secret) 
}
main().catch(console.error)
//console.log("inside twitter");