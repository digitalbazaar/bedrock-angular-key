/*!
 * Add Key Modal.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 * @author David I. Lehn
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brAddKeyModal', {
    bindings: {
      identity: '<brIdentity',
      onAdd: '&brOnAdd'
    },
    controller: Ctrl,
    require: {
      'stackable': '^'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-key/add-key-modal-component.html')
  });
}

function Ctrl($scope, brAlertService, config) {
  var self = this;

  self.$onInit = function() {
    self.loading = false;
    self.success = false;
    self.key = {
      '@context': config.data.contextUrls.identity,
      label: 'Access Key 1',
      owner: self.identity.id,
      publicKeyPem: ''
    };

    // flag if PEM UI is needed
    self.needPem = !self.key.publicKeyPem;
  };

  self.addKey = function() {
    brAlertService.clearFeedback();
    self.loading = true;
    self.onAdd({key: self.key}).then(function(key) {
      // replace key with newly created key data
      self.key = key;
      self.success = true;
    }).catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    }).then(function() {
      self.loading = false;
      $scope.$apply();
    });
  };

  self.done = function() {
    self.stackable.close(null, self.key);
  };
}

return register;

});
