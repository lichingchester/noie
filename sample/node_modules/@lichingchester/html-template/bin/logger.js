'use strict';

require('node-json-color-stringify');
const config = require('./_config');

// try using chalk
const chalk = require('chalk');
const log = console.log;

module.exports.info = (msg) => log(chalk.blue(msg));
module.exports.success = (msg) => log(chalk.green(msg));

module.exports.debugStatus = (msg) => log(chalk.bold.dim.white(`Debug Status: ${msg}`));
module.exports.debug = (msg) => log(chalk.bold.black.bgWhiteBright(`Debug: ${convertor(msg)}`));


module.exports.custom = (msg) => log(msg);


const convertor = (msg) => {
  switch(typeof msg){
    case "object":
      return JSON.colorStringify(msg, null, 2);
      break;
    default:
      return msg;
  }
}

// try using winston

// const winston = require('winston');
// const winstonFormat = winston.format.json();
// const winstonConsole = new winston.transports.Console({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.printf(
//       msg => `${msg.level}: ${msg.message}`
//     )
//   )
// });
// const logger = winston.createLogger({
//   transports: [ winstonConsole ]
// });
// module.exports = logger;