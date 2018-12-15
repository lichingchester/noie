'use strict';

const chalk = require('chalk');

const env_develop = process.env.NODE_ENV === 'development';

const config = {
  name: "noie",

  command: {
    output: env_develop ? './sample' : '.',
    exec: env_develop ? 'cd sample && npm init -y' : 'npm init -y',
    packageJsonOutput: env_develop ? './sample/package.json' : './package.json',
    install: env_develop ? 'cd sample && npm install @lichingchester/noie' : 'npm install @lichingchester/noie',
  },

  message: {
    initSuccess: chalk`\nNow you can run:
    {cyan npm start}      to start your new site, or
    {cyan npm run build}  to build it into the 'public' folder.\n`
  },

  build: {
    srcPath: env_develop ? './sample/src' : './src',
    outputPath: env_develop ? './sample/public' : './public',
    cleanUrls: true,
    site: {}
  }
}

module.exports = config;