var pages = global.bedrock.pages || {};

pages.keys = pages.keys || {};
pages.keys.app = require('./app');
pages.keys.key = require('./key');
pages.keys.keySelector = require('./key-selector');

module.exports = global.bedrock.pages = pages;
