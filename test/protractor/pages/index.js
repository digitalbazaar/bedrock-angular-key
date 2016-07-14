var pages = global.bedrock.pages || {};

pages.keys = pages.keys || {};
pages.keys.keySelector = require('./key-selector');

module.exports = global.bedrock.pages = pages;
