const through2 = require('through2')

const batchStream = (batchSize=10) =>{
   let batch =[]

   return through2.obj(
      (chuck,enc,next) =>{
         batch.push(chuck)
         if(batch.length===batchSize){
            let data = batch
            batch =[]
            next(null,data)
         } else{
            next();
         }
      },
      (next) =>{
         if(batch.length>0){
            next(null,batch)
         } else{
            next()
         }
      }
   )
}
module.exports = batchStream