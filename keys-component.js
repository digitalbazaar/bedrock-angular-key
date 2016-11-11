/*!
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brKeys', {
    bindings: {
      identity: '<brIdentity',
      hideGenerate: '<?brHideGenerate',
      showRevoked: '<?brShowRevoked'
    },
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-key/keys-component.html')
  });
}

/* @ngInject */
function Ctrl($scope, $routeParams, brAlertService, brKeyService,
  brSessionService) {
  var self = this;
  self.activeKeys = false;
  self.hideGenerate = !!self.hideGenerate;
  self.showRevoke = !!self.showRevoked;
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

  self.$onInit = function() {
    init(self.identity);
  };

  self.$onChanges = function(changes) {
    if(changes.identity && !changes.identity.isFirstChange()) {
      init(changes.identity.currentValue);
    }
  };

  self.addKey = function(key) {
    self.activeKeys = true;
    return self.service.collection.add(key);
  };

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
      self.service.revoke(self.modals.key.id)
        .catch(function(err) {
          brAlertService.add('error', err, {scope: $scope});
        })
        .then(function() {
          setActiveKeys();
          $scope.$apply();
        });
    }
    self.modals.key = null;
  };

  self.onKeyGenerate = function(key) {
    self.activeKeys = true;
    return self.service.collection.add(key);
  };

  function setActiveKeys() {
    self.activeKeys = false;
    for(var i = 0; i < self.keys.length; i++) {
      if(self.keys[i].sysStatus === 'active') {
        self.activeKeys = true;
        break;
      }
    }
  }

  function init(identity) {
    self.operations = {
      add: false,
      remove: false
    };
    var sessionPromise = brSessionService.get().then(function(session) {
      self.isOwner = (session.identity &&
        (identity.id === session.identity.id));
      if(self.isOwner ||
        (session.identity &&
        hasPermission(session.identity, identity.id, 'PUBLIC_KEY_CREATE'))) {
        self.operations.add = true;
      }
    });
    var keysPromise = brKeyService.getService({identity: identity})
      .then(function(service) {
        self.service = service;
        self.keys = service.keys;
        self.state = service.state;
        return self.service.collection.getAll();
      });
    Promise.all([sessionPromise, keysPromise]).catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    }).then(function() {
      setActiveKeys();
      $scope.$apply();
    });
  }

  function hasPermission(identity, resource, permission) {
    if('sysPermissionTable' in identity) {
      // if sysPermissionTable is an object, it is a map of specific resources
      // to which this permission applies.
      // boolean value indicates that the user has unrestricted permissions
      if(permission in identity.sysPermissionTable &&
        identity.sysPermissionTable[permission] === true) {
        return true;
      }
      if(permission in identity.sysPermissionTable &&
        resource in identity.sysPermissionTable[permission]) {
        return identity.sysPermissionTable[permission][resource];
      }
    }
    return false;
  }
}

return register;

});
