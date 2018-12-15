'use strict';

const logger = require('../logger');
const config = require('../_config');
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const build = require('./build');
const server = require('../server');

const serve = (options, flags) => {
  logger.info(`Starting local server at http://localhost:${flags.port}`);
  
  const { srcPath, outputPath } = config.build;

  build(options);
  server.serve({ path: outputPath, port: flags.port });

  chokidar.watch(srcPath, { ignoreInitial: true }).on(
    'all',
    debounce(() => {
      build(options);
      logger.info('Waiting for changes...');
    }, 500)
  );
}

module.exports = serve;