/*
 * Bedrock Configuration.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var fs = require('fs');
var path = require('path');

module.exports = function(bedrock) {
  var prepare = path.join(__dirname, 'prepare.js');
  if(bedrock.config.protractor && fs.existsSync(prepare)) {
    //var protractor = bedrock.config.protractor.config;
    // add protractor tests
    // protractor.suites['bedrock-angular-key'] =
    //   path.join(__dirname, './tests/**/*.js');
    // protractor.params.config.onPrepare.push(prepare);
  }

  // FIXME: overrides config set elsewhere
  // export bedrock-key location for UI
  var vars = bedrock.config.views.vars;
  vars['bedrock-angular-key'] = vars['bedrock-angular-key'] || {};
  if('key' in bedrock.config) {
    vars['bedrock-angular-key'].basePath =
      bedrock.config['key'].basePath || '';
  } else {
    vars['bedrock-angular-key'].basePath = '';
  }
};
