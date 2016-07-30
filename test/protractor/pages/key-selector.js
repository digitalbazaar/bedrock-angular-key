var bedrock = global.bedrock;

var api = {};
module.exports = api;

var by = global.by;
var element = global.element;
var should = global.should;
var expect = global.expect;
var protractor = global.protractor;
var EC = protractor.ExpectedConditions;

api.get = function(slug) {
  bedrock.get('/i/' + slug);
  return api;
};

api.addKeyFromModal = function(name) {
  var modal = element(by.tagName('br-modal'));
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

api.deselectKeyFromModal = function() {
  var modal = element(by.modal());
  modal.element(by.partialButtonText('Deselect')).click();
  bedrock.waitForModalTransition();
};

api.selectedKeyId = function(keySelector) {
  return keySelector.element(
    by.tagName('br-selector-selected')).element(by.tagName('small')).getText();
};

api.changeKeyModal = function(keySelector) {
  keySelector.element(
    by.attribute('ng-click', '$ctrl.showChoices=true')).click();
  bedrock.waitForModalTransition();
};
