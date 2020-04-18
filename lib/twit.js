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
         console.log(config.baseURL)
         config.headers = oauth.toHeader(oauth.authorize({
           url : `${this.baseURL}${config.url}`,
           method : config.method,
           data : config.data   
         },this.token))
         config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
         return config
      })
      axios.defaults.baseURL = this.baseUrl
   }

   setToken (key,secret){
      this.token = {key,secret}
   }

   async get (api){
     try{
       let response = await axios.get(api);
       return response.data
     } catch{
        handleTwitterError(error)
     }
   }

   async post (api,data){
     try{ 
        console.log(data)
      let response = await axios.post(api,data)
      return response.data 
     } catch{
        handleTwitterError(error)
     }
   }
}

  function handleTwitterError(){
     if(erro.message.include('401')){
        throw new Error('Invalid Twitter credentials -- try running \'configure\' again')
     } else if(error.message.include('429')){
        throw new Error('Twitter rate limit reached -- try again later')
     }
     else{
        throw new Error(`twitter: ${error.message }`)
     }
  }
module.exports = Twits