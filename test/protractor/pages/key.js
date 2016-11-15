/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var protractor = global.protractor;
var EC = protractor.ExpectedConditions;

var api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-keys';

api.actionMenuButton = function() {
  return $(api.COMPONENT_TAG + ' br-headline .fa-bars');
};

api.keyList = function() {
  return element.all(by.repeater('key in $ctrl.keys'))
    .map(i => i.all(by.css('td')).get(0).getText());
};
