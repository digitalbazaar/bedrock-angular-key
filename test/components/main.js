/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './test-harness-component'
], function(angular) {

'use strict';

var keyBasePath = window.data['bedrock-angular-key'].basePath;

var module = angular.module('bedrock.key-test', [
  'bedrock.authn', 'bedrock.authn-password', 'bedrock.form', 'bedrock.key',
  'bedrock.session'
]);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Test Harness',
      template: '<br-test-harness></br-test-harness>'
    })
    .when('/key-test-alpha', {
      title: 'Key Test Alpha',
      session: 'required',
      template: '<br-keys br-identity="$resolve.session.identity"></br-keys>'
    })
    .when(keyBasePath + '/:keyId', {
      title: 'Key',
      templateUrl: requirejs.toUrl('bedrock-angular-key/key.html')
    });
});

});
