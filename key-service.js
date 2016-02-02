/*!
 * Key Service.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(
  $rootScope, brIdentityService, brModelService, brRefreshService,
  brResourceService, config) {
  var service = {};

  // collections indexed by id
  var cache = {};

  var basePath = config.data['key-http'].basePath;

  service.get = function(options) {
    var identityId;
    var url;
    if(options.identity) {
      identityId = options.identity.id;
      url = basePath + '?owner=' + encodeURIComponent(identityId);
    } else {
      identityId = brIdentityService.generateUrl(options);
      if(!identityId) {
        url = basePath;
      } else {
        url = identityId + '/keys';
      }
    }
    options = angular.extend({}, {
      // get keys for current logged in identity by default
      identityId: identityId,
      url: basePath,
      urls: {
        getAll: url
      }
    }, options);
    if(!(url in cache)) {
      cache[url] = new Service(options);
      // register for system-wide refreshes
      brRefreshService.register(cache[url].collection);
    }
    return cache[url];
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
}

return {brKeyService: factory};

});
