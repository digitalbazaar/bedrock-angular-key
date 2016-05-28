/*!
 * Key module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved. *
 */
define([
  'angular',
  './add-key-modal-directive',
  './edit-key-modal-directive',
  './generate-key-pair-modal-component',
  './key-controller',
  './key-form-component',
  './key-selector-component',
  './key-service',
  './keys-controller',
  './keys-directive'
], function(
  angular,
  addKeyModalDirective,
  editKeyModalDirective,
  generateKeyPairModalComponent,
  keyController,
  keyFormComponent,
  keySelectorComponent,
  keyService,
  keysController,
  keysDirective
) {

'use strict';

var module = angular.module('bedrock.key', []);

/*Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});*/
keySelectorComponent(module);
generateKeyPairModalComponent(module);
keyFormComponent(module);

// TODO: refactor
module.directive(addKeyModalDirective);
module.directive(editKeyModalDirective);
module.controller(keyController);
module.service(keyService);
module.controller(keysController);
module.directive(keysDirective);

return module.name;

});
