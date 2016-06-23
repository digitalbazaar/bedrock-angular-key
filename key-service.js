/*!
 * Key Service.
 *
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(
  $rootScope, $httpParamSerializer, brModelService,
  brRefreshService, brResourceService, config) {
  var service = {};

  // collections indexed by identity id
  var cache = {};

  var basePath = config.data['key-http'].basePath;

  service.get = function(options) {
    options = options || {};
    var identityId = null;
    var params = angular.extend({}, options.params || {});
    if(options.identity) {
      identityId = options.identity.id;
      params.owner = identityId;
    }
    params = $httpParamSerializer(params);
    var url = basePath;
    if(params) {
      // TODO: ensure '?' isn't already present/use URL formatter lib
      url += '?' + params;
    }

    options = angular.extend({}, {
      // get keys for current logged in identity by default
      identityId: identityId,
      url: basePath,
      urls: {
        getAll: url
      }
    }, options);
    // only cache for identity id collections
    if(identityId) {
      if(!(url in cache)) {
        cache[url] = new Service(options);
        // FIXME: temporary hack for cached services
        monkeyPatchCollection(cache[url].collection);
        // register for system-wide refreshes
        brRefreshService.register(cache[url].collection);
      }
      return cache[url];
    }

    // FIXME: register/unregister for non-identity services
    return new Service(options);
  };

  service.getService = function(options) {
    return Promise.resolve(service.get(options));
  };

  /**
   * Create a keys service for an identity.
   *
   * @param options
   *          identityId: the identity id
   *          url: the keys URL (optional)
   *          urls: the collection method URLs (optional)
   */
  function Service(options) {
    this.identityId = options.identityId;
    this.url = options.url;
    this.urls = options.urls;
    var opts = {
      finishLoading: this.update.bind(this)
    };
    if('url' in options) {
      opts.url = options.url;
    }
    if('urls' in options) {
      opts.urls = options.urls;
    }
    this.collection = new brResourceService.Collection(opts);
    this.keys = this.collection.storage;
    this.unrevokedKeys = [];
    this.state = this.collection.state;
  }

  Service.prototype.update = function() {
    var unrevoked = this.collection.storage.filter(function(key) {
      return !key.revoked;
    });
    brModelService.replaceArray(this.unrevokedKeys, unrevoked);
  };

  Service.prototype.revoke = function(keyId, options) {
    return this.collection.update({
      '@context': config.data.contextUrls.identity,
      id: keyId,
      revoked: ''
    }, options);
  };

  // expose service to scope
  $rootScope.app.services.key = service;

  return service;

  function monkeyPatchCollection(collection) {
    // FIXME: temporary hack to ensure updates propagate to other cached
    // collections that use different URLs
    var _doUpdate = collection._doUpdate;
    collection._doUpdate = function() {
      var result = _doUpdate.apply(collection, arguments);
      if(result && !collection._syncUpdate) {
        // force update other cached collections
        angular.forEach(cache, function(service) {
          if(service.collection === collection) {
            return;
          }
          service.collection._syncUpdate = true;
          service.collection.getAll({force: true})
            .catch(angular.noop)
            .then(function() {
              service.collection._syncUpdate = false;
            });
        });
      }
      return result;
    };
  }
}

return {brKeyService: factory};

});
