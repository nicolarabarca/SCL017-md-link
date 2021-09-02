#!/usr/bin/env node  
const [,, ...args] = process.argv
console.log(`Hola ${args}`)

const mdLinks = require("./index").mdLinks;

mdLinks(args[0])

//mdLinks('C:/Users/nicole/Documents/MD-link/SCL017-md-link/assets') require("./index").mdLinks;