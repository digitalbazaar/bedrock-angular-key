/*!
 * Simple Key Form.
 *
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brKeyForm', {
    bindings: {
      model: '=ngModel'
    },
    templateUrl: requirejs.toUrl('bedrock-angular-key/key-form-component.html'),
  });
}

return register;

});
