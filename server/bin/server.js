#!/usr/bin/env node
const config = require('config/server');
const Server = require('server/index');
const executeAppSecure = require('helpers/executeAppSecure');

const server = new Server(config);

executeAppSecure(server);
