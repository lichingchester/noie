#! /usr/bin/env node
'use strict';

require('dotenv').load();
const chalk = require('chalk');
const meow = require('meow');
const command = require('./command');
const config = require('./_config');
// const log = require('./logger');

// log.debugStatus('test started');

const cli = meow(
  chalk`
    {yellow Initialize a new site:}

      {cyan $ noie init}

    {yellow Serve the current site:}

      {cyan $ noie serve [options]}

    {yellow Build the current site:}

      {cyan $ noie build [options]}

    {underline {yellow Options}}
      {cyan -c, --config <file-path>}  Path to the config file (default: site.config.js)
      {cyan -p, --port <port-number>}  Port to use for local server (default: 3000)
      
      {cyan -h, --help}                Display this help text
      {cyan -v, --version}             Display noie version
  `,
  {
    flags: {
      config: {
        type: 'string',
        default: config.config,
        alias: 'c'
      },
      port: {
        type: 'string',
        default: '3000',
        alias: 'p'
      },
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

command(cli.input, cli.flags);

// log.debugStatus('test end');
