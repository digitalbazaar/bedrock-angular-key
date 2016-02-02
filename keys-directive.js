/*!
 * Keys directive.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author David I. Lehn
 * @author Dave Longley
 */
define([], function() {

'use strict';

var deps = [];
return {brKeys: deps.concat(factory)};

function factory() {
  return {
    scope: {
      identity: '=brIdentity',
      hideGenerate: '=?brHideGenerate'
    },
    restrict: 'E',
    templateUrl: requirejs.toUrl('bedrock-angular-key/keys-view.html')
  };
}

});
