/*!
 * Key Details.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 * @author David I. Lehn
 * @author Dave Longley
 */
/* @ngInject */
export default function factory(
  $scope, brAlertService, brKeyService, brRefreshService) {
  var self = this;

  var _keys = brKeyService.get();
  self.modals = {};
  self.state = {
    keys: _keys.state
  };
  self.key = undefined;

  brRefreshService.register($scope, function(force) {
    var opts = {force: !!force};
    brAlertService.clear();
    _keys.collection.getCurrent(opts).then(function(key) {
      self.key = key;
      self.linkOwner = (key.owner.indexOf('http') === 0);
    }).catch(function(err) {
      brAlertService.add('error', err);
      self.key = null;
    }).then(function() {
      $scope.$apply();
    });
  })();
}
