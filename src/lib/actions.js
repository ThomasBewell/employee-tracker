const connection = require('../config/config');
const queries = require('./queries');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const actionsList = require('./actionsList');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);