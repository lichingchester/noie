'use strict';

const path = require('path');
const fse = require('fs-extra');
const cp = require('child_process');
const ora = require('ora');
const logger = require('../logger');
const config = require('../_config');
const clear = require('clear');

const env_develop = process.env.NODE_ENV === 'development';

const init = () => {
  // logger.debugStatus('init start');

  // copy all template files and folders into user ./ directory
  fse.copySync(path.resolve(__dirname, '../../template'), config.command.output);
  // logger.debug(process.env.NODE_ENV);
  
  // run npm init -y
  cp.execSync(config.command.exec);

  // create package.json with scripts
  const packageJSON = require(path.relative(__dirname, config.command.packageJsonOutput));
  packageJSON.scripts = {
    start: `${config.name} start`,
    build: `${config.name} build`
  };
  fse.writeFileSync(config.command.packageJsonOutput, JSON.stringify(packageJSON, null, 2));

  // clear terminal screen before installation
  clear();
  
  // install ${config.name}
  const spinner = ora('Installing dependencies...').start();
  cp.exec(config.command.install, () => {
    spinner.succeed();

    logger.success(`Initialized successfully!`);
    logger.info(config.message.initSuccess);
  })

  // logger.debugStatus('init end');
}

module.exports = init;