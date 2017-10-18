/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = global.bedrock;

const api = {};
module.exports = api;

const protractor = global.protractor;
const EC = protractor.ExpectedConditions;

api.get = slug => {
  bedrock.get('/i/' + slug);
  return api;
};

api.addKeyFromModal = name => {
  const modal = element(by.tagName('br-modal'));
  browser.wait(EC.visibilityOf(modal), 3000);
  modal.element(by.buttonText('Add Key')).click();
  browser.wait(
    EC.visibilityOf(element(by.tagName('br-generate-key-pair-modal'))), 3000);
  element(by.partialButtonText('Generate Key')).click();
  // extend timeout, key generation can take some time
  browser.wait(
    EC.elementToBeClickable(element(by.buttonText('Save'))), 30000);
  if(name) {
    element(by.model('$ctrl.model.key.label'))
      .clear()
      .sendKeys(name);
  }
  element(by.buttonText('Save')).click();
  browser.wait(
    EC.invisibilityOf(element(by.tagName('br-generate-key-pair-modal'))), 3000);
};

api.deselectKeyFromModal = () => {
  const modal = element(by.modal());
  modal.element(by.partialButtonText('Deselect')).click();
  bedrock.waitForModalTransition();
};

api.selectedKeyId = keySelector => {
  return keySelector.element(
    by.tagName('br-selector-selected')).element(by.tagName('small')).getText();
};

api.changeKeyModal = keySelector => {
  keySelector.element(
    by.attribute('ng-click', '$ctrl.showChoices=true')).click();
  bedrock.waitForModalTransition();
};
