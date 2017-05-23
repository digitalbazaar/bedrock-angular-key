/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
var _ = require('lodash');
var bedrock = require('bedrock');
var brIdentity = require('bedrock-identity');
var util = require('util');
// NOTE: it is critical that bedrock-protractor be required first so that
// it can register a bedrock.cli event listener
require('bedrock-protractor');
require('bedrock-authn-password');
require('bedrock-key-http');
require('bedrock-session-http');
require('bedrock-views');

require('./app.config');

bedrock.events.on(
  'bedrock-session-http.session.get', (req, session) => {
    session.identity = session.identity || {};
    if(req.isAuthenticated()) {
      _.assign(session.identity, req.user.identity, session.identity);
    }
  });

bedrock.events.on('bedrock-express.configure.routes', app => {
  app.post('/createidentity', (req, res) => {
    var identity = {};
    identity['@context'] = bedrock.config.constants.IDENTITY_CONTEXT_V1_URL;
    identity.id = createIdentityId(req.body.sysSlug);
    identity.type = 'Identity';
    identity.sysSlug = req.body.sysSlug;
    identity.sysResourceRole = req.body.sysResourceRole;
    identity.sysPassword = req.body.sysPassword;
    identity.sysStatus = 'active';
    brIdentity.insert(null, identity, (err, result) => {
      res.status(201).json(result);
    });
  });
});

function createIdentityId(name) {
  return util.format(
    '%s%s/%s', bedrock.config.server.baseUri, '/i', encodeURIComponent(name));
}

require('bedrock-test');
bedrock.start();
