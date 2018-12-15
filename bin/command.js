'use strict';

const path = require('path');
const fse = require('fs-extra');
const logger = require('./logger');
const template = require('./commands/index');

const command = (input = [], flags = {}) => {  
  const command = input.length > 0 ? input[0] : null;

  switch(command){
    case 'init':
      template.init();
      break;
    case 'serve':
      template.serve(setConfig(flags), flags);
      break;
    case 'build':
      template.build();
      break;
    default:
      logger.error('Invalid command');
  }
};

const setConfig = flags => {
  if(! fse.existsSync(path.resolve(flags.config))){
    logger.error('\nConfig file not found\n');
    return;
  }

  return flags.config ? require(path.resolve(flags.config)) : {}
};

module.exports = command;