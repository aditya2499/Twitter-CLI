const crypto = require("crypto")
const OAuth = require("oauth-1.0a")
const axios = require("axios")

class Twits{
   constructor(consumerKey, consumerSecret){
      this.baseUrl = 'https://api.twitter.com/'
      this.token = {}
      let oauth = OAuth({
         consumer : {
            key : consumerKey,
            secret : consumerSecret
         },
         signature_method : 'HMAC_SHA1',
         hash_function(baseString,key){
            return crypto.createHmac('sha1',key).update(baseString).digest('base64')
         }
      })

      axios.interceptors.request.use((config)=>{
         config.header = oauth.toHeader(oauth.authorize({
           url : `${config.baseUrl}${config.url}`,
           method : config.method,
           data : config.data   
         },this.token))
         config.header['Content-Type'] = 'application/x-www-form-urlencoded'
         return config
      })
   }

   setToken (key,secret){
      this.token = {key,sceret}
   }

   async get (api){
      let response = await axios.get(api);
      return response.data
   }

   async post (api,data){
      let response = await axios.post(api,data)
      return response.data
   }
}

module.exports = Twits