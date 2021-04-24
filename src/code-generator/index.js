#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

const createAllTemplates = require('./create-all-templates');
const applyConfig = require('./apply-config-file');

const DEFAULT_NAME = 'FeatureName';
const DEFAULT_COMPONENT_DIRECTORY = 'src/components';
const DEFAULT_API_URL = 'some-api-url';

program
  .option('-n, --name [name]', `(e.g. ${DEFAULT_NAME}).`, DEFAULT_NAME)
  .option('-d, --directory [directory]', `(e.g ${DEFAULT_COMPONENT_DIRECTORY}).`, DEFAULT_COMPONENT_DIRECTORY)
  .option('-a, --api [api]', `(e.g ${DEFAULT_API_URL}).`, DEFAULT_API_URL)
  .parse(process.argv);

applyConfig(program, ({ name, directory, api }) => {
  console.log(
    chalk.bold.underline.cyan('Parameters:'),
    chalk.bold.magenta('\nname:\t\t\t'),
    chalk.yellow(name),
    chalk.bold.magenta('\ndirectory:\t\t'),
    chalk.yellow(directory),
    chalk.bold.magenta('\napi url:\t\t'),
    chalk.yellow(api),
    '\n'
  );

  createAllTemplates(name, directory, api);
});
