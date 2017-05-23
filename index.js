/*!
 * Key module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved. *
 */
import angular from 'angular';
import AddKeyModalComponent from './add-key-modal-component.js';
import EditKeyModalDirective from './edit-key-modal-directive.js';
import GenerateKeyPairModalComponent from
  './generate-key-pair-modal-component.js';
import KeyController from './key-controller.js';
import KeyFormComponent from './key-form-component.js';
import KeySelectorComponent from './key-selector-component.js';
import KeyService from './key-service.js';
import KeysComponent from './keys-component.js';

var module = angular.module('bedrock.key', [
  'bedrock.alert', 'bedrock.modal', 'bedrock.resource', 'bedrock.selector',
  'bedrock.session', 'bedrock.ui'
]);

module.component('brAddKeyModal', AddKeyModalComponent);
module.component('brGenerateKeyPairModal', GenerateKeyPairModalComponent);
module.component('brKeyForm', KeyFormComponent);
module.component('brKeySelector', KeySelectorComponent);
module.component('brKeys', KeysComponent);
module.directive('brEditKeyModal', EditKeyModalDirective);
module.controller('keyController', KeyController);
module.service('brKeyService', KeyService);
