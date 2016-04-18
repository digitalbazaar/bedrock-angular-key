/*!
 * Keys Controller.
 *
 * Copyright (c) 2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 * @author David I. Lehn
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope, $routeParams, brAlertService, brIdentityService,
  brKeyService, brSessionService, config) {
  var self = this;
  self.hideGenerate = !!$scope.hideGenerate;
  self.modals = {
    showGenerateKeyPair: false,
    showAddKey: false,
    showEditKey: false,
    showRevokeKeyAlert: false,
    key: null
  };

  if($routeParams.service === 'add-key') {
    self.modals.showAddKey = true;
  }

  self.editKey = function(key) {
    self.modals.showEditKey = true;
    self.modals.key = key;
  };
  /* FIXME: move outside of key module
  self.setDefaultSigningKeyId = function(keyId) {
    var update = {
      '@context': config.data.contextUrls.identity,
      id: self.identity.id,
      sysSigningKey: keyId
    };

    brIdentityService.collection.update(update)
      .catch(function(err) {
        // FIXME: show error feedback
        if(err) {
          console.error('setDefaultSigningKeyId error:', err);
        }
      });
  };
  */
  self.revokeKey = function(key) {
    self.modals.showRevokeKeyAlert = true;
    self.modals.key = key;
  };
  self.confirmRevokeKey = function(err, result) {
    if(!err && result === 'ok') {
      self.service.revoke(self.modals.key.id);
    }
    self.modals.key = null;
  };

  self.init = function(identity) {
    var sessionPromise = brSessionService.get().then(function(session) {
      console.log('##############', session);
      brIdentityService.collection.get(session.identity.id)
        .then(function(result) {
          console.log('##############', result);
        });
      self.isOwner = (session.identity &&
        (identity.id == session.identity.id));
    });
    var keysPromise = brKeyService.getService({
      identity: identity
    }).then(function(service) {
      self.service = service;
      self.keys = service.keys;
      self.state = service.state;
      return self.service.collection.getAll();
    });
    Promise.all([sessionPromise, keysPromise]).catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    }).then(function() {
      $scope.$apply();
    });
  };

  $scope.$watch('identity', function(value) {
    // FIXME: clear state if no value?
    if(value) {
      self.init(value);
    }
    self.identity = value;
  });
}

return {KeysController: factory};

});
