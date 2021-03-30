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

function getAllDirectories(name, directory) {
  return getReactComponentDirs(name, directory);
}

function getReactComponentDirs(name, directory) {
  const templateDirectory = path.join(__dirname, './', 'templates');
  const generatedDirectory = path.join(ROOT_PATH, directory, name);

  if (!fs.existsSync(generatedDirectory)) {
    shell.mkdir('-p', path.join(generatedDirectory, 'test'));
  }

  const reactDirs = {
    view: {
      template: path.join(templateDirectory, 'template.view.js'),
      generated: path.join(generatedDirectory, `${name}.view.js`),
    },
    // stylesheet: {
    //   template: path.join(templateDirectory, '_template.styles.scss'),
    //   generated: path.join(generatedDirectory, `_${name}.styles.scss`),
    // },
  };

  return reactDirs;
}

function getAllPlaceholderNames(name) {
  const lowerCamel = _.camelCase(name);
  const upperCamel = _.upperFirst(lowerCamel);
  return { name, lowerCamel, upperCamel };
}

function createTemplate(directory, placeholderNames, callback) {
  fs.readFile(directory.template, 'utf8', (err, data) => {
    if (err) throw err;

    data = _.replace(data, /TEMPLATE_KEBAB_CASE_NAME/g, placeholderNames.name);
    data = _.replace(data, /TEMPLATE_LOWER_CAMEL_CASE_NAME/g, placeholderNames.lowerCamel);
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
