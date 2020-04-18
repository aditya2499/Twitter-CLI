#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");

program
  .version(pkg.version)
  .command('configure',"configure twitter related credentials")
  .command('lookup','lookup things on Twitter')
  .parse(process.argv)

  //console.log(pkg.name)