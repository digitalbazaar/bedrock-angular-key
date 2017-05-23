/*!
 * Edit Key Modal.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';

/* @ngInject */
export default function factory(brAlertService, brKeyService, config) {
  return {
    restrict: 'AE',
    scope: {
      identity: '=brIdentity',
      sourceKey: '=brKey'
    },
    require: '^stackable',
    templateUrl: 'bedrock-angular-key/edit-key-modal.html',
    link: Link
  };

  function Link(scope, element, attrs, stackable) {
    var model = scope.model = {};
    var keys = brKeyService.get({
      identity: scope.identity
    });
    model.mode = 'edit';
    model.loading = false;
    // copy source budget for editing
    model.key = {};
    angular.extend(model.key, scope.sourceKey);

    model.editKey = function() {
      // set all fields from UI
      var key = {
        '@context': config.data.contextUrls.identity,
        id: model.key.id,
        label: model.key.label
      };

      model.loading = true;
      brAlertService.clearFeedback();
      var promise = keys.collection.update(key);
      promise.then(function(key) {
        model.loading = false;
        stackable.close(null, key);
      }).catch(function(err) {
        model.loading = false;
        brAlertService.add('error', err, {scope: scope});
      })
      .then(function() {
        scope.$apply();
      });
    };
  }
}
