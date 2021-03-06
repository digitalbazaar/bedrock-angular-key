/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import TestHarnessComponent from './test-harness-component.js';

const keyBasePath = window.data['bedrock-angular-key'].basePath;

const module = angular.module('bedrock.key-test', [
  'bedrock.authn', 'bedrock.authn-password', 'bedrock.form', 'bedrock.key',
  'bedrock.session', 'ngMaterial'
]);

bedrock.setRootModule(module);

module.component('brTestHarness', TestHarnessComponent);

/* @ngInject */
module.config($routeProvider => {
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
      templateUrl: 'bedrock-angular-key/key.html'
    });
});
