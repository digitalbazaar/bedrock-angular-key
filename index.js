/*!
 * Key module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([
  'angular',
  './add-key-modal-directive',
  './edit-key-modal-directive',
  './generate-key-pair-modal-directive',
  './key-controller',
  './key-selector-directive',
  './key-service',
  './keys-controller',
  './keys-directive'
], function(
  angular,
  addKeyModalDirective,
  editKeyModalDirective,
  generateKeyPairModalDirective,
  keyController,
  keySelectorDirective,
  keyService,
  keysController,
  keysDirective
) {

'use strict';

var module = angular.module('bedrock.key', []);

module.directive(addKeyModalDirective);
module.directive(editKeyModalDirective);
module.directive(generateKeyPairModalDirective);
module.controller(keyController);
module.directive(keySelectorDirective);
module.service(keyService);
module.controller(keysController);
module.directive(keysDirective);

return module.name;

});
