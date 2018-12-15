'use strict';

const template = require('./commands/index');

const command = (input = []) => {
  const command = input.length > 0 ? input[0] : null;
  switch(command){
    case 'init':
      template.init();
      break;
    case 'start':
    //  log.debugStatus('start');
     break;
    case 'build':
      template.build();
     break;
    default:
      // log.debugStatus('Invalid command');
  }
};

module.exports = command;