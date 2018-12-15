'use strict';

const { name } = require('./_config');
const chalk = require('chalk');
const log = console.log;

module.exports.info = (msg) => log(chalk.bold.blue(`${name}: ${msg}`));

module.exports.debugStatus = (msg) => log(chalk.bold.dim.white(`Debug Status: ${msg}`));
module.exports.debug = (msg) => log(chalk.bold.black.bgWhiteBright(`Debug: ${msg}`));