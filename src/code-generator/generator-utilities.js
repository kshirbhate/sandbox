'use strict';

const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const prettier = require('prettier');
const commander = require.resolve('commander');
const _ = require('lodash');

const NODE_MODULES_PATH = 'node_modules';
const ROOT_PATH = getRootPath();
const PRETTIER_CONFIG = {
  tabWidth: 4,
  singleQuote: true,
  printWidth: 100,
};

function getAllDirectories(name, directory, placeholderNames) {
  return getReactComponentDirs(name, directory, placeholderNames);
}

function getReactComponentDirs(name, directory, placeholderNames) {
  const templateDirectory = path.join(__dirname, './', 'templates', 'ListAndEntity');
  const generatedDirectory = path.join(ROOT_PATH, directory, placeholderNames.upperCamel);
  const actionsDirectory = path.join(ROOT_PATH, directory, placeholderNames.upperCamel, 'actions');
  const entityDirectory = path.join(ROOT_PATH, directory, placeholderNames.upperCamel, 'Entity');
  const listDirectory = path.join(ROOT_PATH, directory, placeholderNames.upperCamel, 'List');
  const reducerDirectory = path.join(ROOT_PATH, directory, placeholderNames.upperCamel, 'reducer');

  if (!fs.existsSync(generatedDirectory)) {
    shell.mkdir('-p', actionsDirectory);
    shell.mkdir('-p', entityDirectory);
    shell.mkdir('-p', listDirectory);
    shell.mkdir('-p', reducerDirectory);
  }

  const reactDirs = {
    types: {
      template: path.join(templateDirectory, 'types.ts'),
      generated: path.join(generatedDirectory, 'types.ts'),
    },
    actions: {
      template: path.join(templateDirectory, 'actions', 'index.ts'),
      generated: path.join(actionsDirectory, 'index.ts'),
    },
    listFields: {
      template: path.join(templateDirectory, 'List', 'fields.ts'),
      generated: path.join(listDirectory, 'fields.ts'),
    },
    listIndex: {
      template: path.join(templateDirectory, 'List', 'index.ts'),
      generated: path.join(listDirectory, 'index.ts'),
    },
    listList: {
      template: path.join(templateDirectory, 'List', 'List.tsx'),
      generated: path.join(listDirectory, 'List.tsx'),
    },
    reducer: {
      template: path.join(templateDirectory, 'reducer', 'reducer.ts'),
      generated: path.join(reducerDirectory, `${placeholderNames.lowerCamel}.ts`),
    },
  };

  return reactDirs;
}

function getAllPlaceholderNames(name) {
  const lowerCamel = _.camelCase(name);
  const upperCamel = _.upperFirst(lowerCamel);
  const capitalCase = _.replace(_.upperCase(lowerCamel), ' ', '_');
  return { name, lowerCamel, upperCamel, capitalCase };
}

function createTemplate(directory, placeholderNames, callback) {
  fs.readFile(directory.template, 'utf8', (err, data) => {
    if (err) throw err;

    data = _.replace(data, /FEATURE_NAME_CAPITAL/g, placeholderNames.capitalCase);
    data = _.replace(data, /FEATURE_NAME_UPPER_CAMEL/g, placeholderNames.upperCamel);
    data = _.replace(data, /TEMPLATE_UPPER_CAMEL_CASE_NAME/g, placeholderNames.upperCamel);

    const formattedCode = formatCodeWithPrettier(data, directory);

    fs.writeFile(directory.generated, formattedCode, (err) => {
      if (err) throw err;
      return callback();
    });
  });
}

function formatCodeWithPrettier(data, directory) {
  const parser = _.endsWith(directory.generated, '.scss') ? 'scss' : '';
  const config = { ...PRETTIER_CONFIG, parser };

  return prettier.format(data, config);
}

function getRootPath() {
  return commander.slice(0, commander.indexOf(NODE_MODULES_PATH.toLowerCase()));
}

module.exports = {
  createTemplate,
  getAllDirectories,
  getAllPlaceholderNames,
  getRootPath,
};
