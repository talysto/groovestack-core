#!/usr/bin/env node

const shell = require('shelljs')
const directory = __dirname

shell.exec(`${__dirname}/groovestack/groovestack-create.sh ${process.argv[2]} ${directory}`)