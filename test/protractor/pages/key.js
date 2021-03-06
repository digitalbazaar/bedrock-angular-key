/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-keys';

api.actionMenuButton = () => {
  return $(api.COMPONENT_TAG + ' br-headline .fa-bars');
};

api.keyList = () => {
  return element.all(by.repeater('key in $ctrl.keys'))
    .map(i => i.all(by.css('td')).get(0).getText());
};
