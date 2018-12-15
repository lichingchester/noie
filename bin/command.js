'use strict';

const path = require('path');
const fse = require('fs-extra');
const logger = require('./logger');
const template = require('./commands/index');

const command = (input = [], flags = {}) => {  
  const command = input.length > 0 ? input[0] : null;

  if(! fse.existsSync(path.resolve(flags.config))){
    logger.error('\nConfig file not found\n');
    return;
  }

  const config = flags.config ? require(path.resolve(flags.config)) : {};

  switch(command){
    case 'init':
      template.init();
      break;
    case 'serve':
      template.serve(config, flags);
     break;
    case 'build':
      template.build();
     break;
    default:
      logger.error('Invalid command');
  }
};

module.exports = command;