/*
 * Bedrock Configuration.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
module.exports = function(bedrock) {
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
