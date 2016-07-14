var bedrock = global.bedrock;

var api = {};
module.exports = api;

var by = global.by;
var element = global.element;
var should = global.should;
var expect = global.expect;
var protractor = global.protractor;

api.get = function(slug) {
  bedrock.get('/i/' + slug);
  return api;
};

api.addKeyFromModal = function(name) {
  var modal = element(by.modal());
  modal.element(by.partialButtonText('Add Key')).click();
  bedrock.waitForModalTransition();
  element(by.partialButtonText('Generate Key')).click();
  bedrock.waitForModalTransition();
  if(name !== undefined) {
    element(by.model('$ctrl.model.key.label'))
      .clear()
      .sendKeys(name);
  }
  element(by.partialButtonText('Save')).click();
  bedrock.waitForModalTransition();
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
