/*!
 * Key module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved. *
 */
define([
  'angular',
  './add-key-modal-component',
  './edit-key-modal-directive',
  './generate-key-pair-modal-component',
  './key-controller',
  './key-form-component',
  './key-selector-component',
  './key-service',
  './keys-component'
], function(
  angular,
  addKeyModalComponent,
  editKeyModalDirective,
  generateKeyPairModalComponent,
  keyController,
  keyFormComponent,
  keySelectorComponent,
  keyService,
  keysComponent
) {

'use strict';

var module = angular.module('bedrock.key', [
  'bedrock.alert', 'bedrock.modal', 'bedrock.resource', 'bedrock.session',
  'bedrock.ui']);

// Array.prototype.slice.call(arguments, 1).forEach(function(register) {
//   register(module);
// });
addKeyModalComponent(module);
keysComponent(module);
keySelectorComponent(module);
generateKeyPairModalComponent(module);
keyFormComponent(module);

// TODO: refactor
module.directive(editKeyModalDirective);
module.controller(keyController);
module.service(keyService);

return module.name;

});
