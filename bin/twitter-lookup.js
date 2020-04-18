const program = require("commander")
const pkg = require("../package.json")
const configure = require("../commands/configure.js")
const util = require("../lib/util")
program
   .version(pkg.version)

program
   .command("users [screen-names]")
   .description("Find users by screen name")
   .action((names) => lookup
      .users(pkg.name,names)
      .catch(util.handleError)     
   )

program.parse(process.argv)

if(!process.argv.slice(2).length){
   program.outputHelp()
}