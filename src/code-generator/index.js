#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

const createAllTemplates = require('./create-all-templates');
const applyConfig = require('./apply-config-file');

const DEFAULT_NAME = 'FeatureName';
const DEFAULT_COMPONENT_DIRECTORY = 'src/components';

program
  .option('-n, --name [name]', `(e.g. ${DEFAULT_NAME}).`, DEFAULT_NAME)
  .option('-d, --directory [directory]', `(e.g ${DEFAULT_COMPONENT_DIRECTORY}).`, DEFAULT_COMPONENT_DIRECTORY)
  .parse(process.argv);

applyConfig(program, ({ name, directory }) => {
  console.log(
    chalk.bold.underline.cyan('Parameters:'),
    chalk.bold.magenta('\nname:\t\t\t'),
    chalk.yellow(name),
    chalk.bold.magenta('\ndirectory:\t\t'),
    chalk.yellow(directory),
    chalk.bold.magenta('\nprogram:\t\t'),
    chalk.yellow(process.argv),
    '\n'
  );

  createAllTemplates(name, directory);
});
