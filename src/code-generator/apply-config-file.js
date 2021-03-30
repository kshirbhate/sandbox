'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { getRootPath } = require('./generator-utilities');

const GRCC = 'grcc.json';

function applyConfig(params, callback) {
  const configDirectory = path.join(getRootPath(), GRCC);

  if (fs.existsSync(configDirectory)) {
    fs.readFile(configDirectory, 'utf8', (err, data) => {
      if (err) throw err;

      let configData;
      try {
        configData = JSON.parse(data);
      } catch (error) {
        console.log(chalk.red('Error reading config file at'), chalk.gray(configDirectory), '\nMake sure your file has the correct format');
        return callback(params);
      }

      return callback(params);
    });
  } else {
    return callback(params);
  }
}

module.exports = applyConfig;
