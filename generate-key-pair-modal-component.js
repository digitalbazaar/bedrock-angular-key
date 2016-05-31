/*!
 * Generate Key Pair Modal.
 *
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['forge/js/pki'], function(pki) {

'use strict';

function register(module) {
  module.component('brGenerateKeyPairModal', {
    require: {
      stackable: '^'
    },
    bindings: {
      identity: '<brIdentity',
      onKeyGenerate: '&brOnKeyGenerate'
    },
    transclude: {
      help: '?brGenerateKeyPairModalHelp'
    },
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-key/generate-key-pair-modal-component.html')
  });
}

/* @ngInject */
function Ctrl($scope, brAlertService, config) {
  var self = this;
  self.mode = 'generate';
  self.loading = false;
  self.success = false;
  self.key = {
    '@context': config.data.contextUrls.identity,
    owner: self.identity.id,
    label: 'Signing Key 1'
  };

  // prepare forge
  var forge = {pki: pki()};

  self.generateKeyPair = function() {
    self.loading = true;
    brAlertService.clearFeedback();
    new Promise(function(resolve, reject) {
      var bits = config.data.keygen.bits;
      forge.pki.rsa.generateKeyPair({
        bits: bits,
        workers: -1,
        //workLoad: 100,
        workerScript: '/bower-components/forge/js/prime.worker.js'
      }, function(err, keypair) {
        if(err) {
          reject(err);
        } else {
          resolve(keypair);
        }
      });
    }).then(function(keypair) {
      var pem = {
        privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey)
      };
      self.key.privateKeyPem = pem.privateKey;
      self.key.publicKeyPem = pem.publicKey;
      self.success = true;
    }).catch(function(err) {
      self.success = false;
      brAlertService.add('error', err, {scope: $scope});
    }).then(function() {
      self.loading = false;
      $scope.$apply();
    });
  };

  self.onSave = function() {
    self.loading = true;
    brAlertService.clearFeedback();
    return self.onKeyGenerate({key: self.key}).catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
      self.success = false;
      return null;
    }).then(function(key) {
      self.loading = false;
      if(self.success) {
        return self.stackable.close(null, key || self.key);
      }
    }).then(function() {
      $scope.$apply();
    });
  };
}

return register;

});
