const program = require("commander")
const pkg = require("../package.json")
const configure = require("../commands/configure.js")

program
   .version(pkg.version)

program
   .command("consumer")
   .description("Add twitter api key and secret")
   .action(async () =>{
      await configure.consumer(pkg.name)
   })

program
   .command('account')
   .description('Authorize access to Twitter Account')
   .action(async () =>{
      await configure.account(pkg.name)
   })

program
   .parse(process.argv)   

if(!process.argv.slice(2).length){
   program.outputHelp()
}   