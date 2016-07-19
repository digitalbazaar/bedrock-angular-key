/*!
 * Key Selector component.
 *
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

function register(module) {
  module.component('brKeySelector', {
    bindings: {
      identity: '<brIdentity',
      keys: '<brKeys',
      selected: '<?brSelected',
      onSelect: '&brOnSelect',
      onAdd: '&?brOnAdd',
      fixed: '<?brFixed'
    },
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-key/key-selector-component.html')
  });
}

/* @ngInject */
function Ctrl() {
  var self = this;

  var onAdd;
  self.$onInit = function() {
    if(typeof self.onAdd === 'function') {
      onAdd = self.onAdd;
      self.allowAdd = true;
    } else {
      // TODO: make `onAdd` optional in non-fixed case
      if(!self.fixed) {
        throw new Error(
          '`br-on-add` must be specified when `br-fixed` is `false`.');
      }
      onAdd = angular.noop;
      self.allowAdd = false;
    }
  };

  self.keyFilter = function(key) {
    var selected = self.selected || {};
    return key.sysStatus === 'active' || key.id === selected.id;
  };

  self.onKeyGenerate = function(key) {
    return Promise.resolve(onAdd({key: key}));
  };
}

return register;

});
