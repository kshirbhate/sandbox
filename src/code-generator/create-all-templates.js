'use strict';

const chalk = require('chalk');
const _ = require('lodash');

const { createTemplate, getAllDirectories, getAllPlaceholderNames } = require('./generator-utilities');

function createAllTemplates(name, directory, api) {
  const placeholderNames = getAllPlaceholderNames(name);
  const directories = getAllDirectories(name, directory, placeholderNames);

  _.forEach(directories, (directory, key) => {
    createTemplate(directory, placeholderNames, api, () => {
      console.log(chalk.bold.blue(key), chalk.bold.green('file successfully created in'), chalk.bold.gray(directory.generated));
    });
  });
}

module.exports = createAllTemplates;
