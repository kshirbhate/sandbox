'use strict';

const chalk = require('chalk');
const _ = require('lodash');

const { createTemplate, getAllDirectories, getAllPlaceholderNames } = require('./generator-utilities');

function createAllTemplates(name, directory) {
  const directories = getAllDirectories(name, directory);
  const placeholderNames = getAllPlaceholderNames(name);

  _.forEach(directories, (directory, key) => {
    createTemplate(directory, placeholderNames, () => {
      console.log(chalk.bold.blue(key), chalk.bold.green('file successfully created in'), chalk.bold.gray(directory.generated));
    });
  });
}

module.exports = createAllTemplates;
