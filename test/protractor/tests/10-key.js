/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = global.bedrock;
const protractor = global.protractor;
const EC = protractor.ExpectedConditions;
const uuid = require('uuid/v4');

const app = bedrock.pages.keys.app;
const key = bedrock.pages.keys.key;

describe('bedrock-angular-key', () => {
  const testIdentity = {
    sysIdentifier: uuid().substr(0, 23),
    password: 'password'
  };

  before(() => {
    bedrock.get('/');
    app.createIdentity(testIdentity);
    app.login(testIdentity);
    browser.wait(EC.visibilityOf($('br-keys')), 3000);
  });

  describe('br-key-component', () => {
    it('action menu contains the proper elements', () => {
      key.actionMenuButton().click();
      browser.wait(EC.visibilityOf($('.stackable-menu')), 3000);
      element(by.linkText('Generate Key Pair'))
        .isDisplayed().should.eventually.be.true;
      element(by.linkText('Add Key'))
        .isDisplayed().should.eventually.be.true;
      element(by.linkText('Show Revoked Keys'))
        .isDisplayed().should.eventually.be.true;
      key.actionMenuButton().click();
    });
    describe('generate-key-pair-modal', () => {
      beforeEach(() => {
        key.actionMenuButton().click();
        browser.wait(EC.visibilityOf($('.stackable-menu')), 3000);
        element(by.linkText('Generate Key Pair')).click();
        browser.wait(EC.visibilityOf($('br-generate-key-pair-modal')), 3000);
      });
      it('should contain the proper elements, cancel closes modal', () => {
        element(by.buttonText('Generate Key')).isDisplayed()
          .should.eventually.be.true;
        const cancelButton = element(by.buttonText('Cancel'));
        cancelButton.isDisplayed()
          .should.eventually.be.true;
        $('a.close').isDisplayed().should.eventually.be.true;
        cancelButton.click();
        var modal = $('br-generate-key-pair-modal');
        browser.wait(EC.invisibilityOf(modal));
        modal.isPresent().should.eventually.be.false;
      });
      it('close button closes modal', () => {
        $('a.close').click();
        var modal = $('br-generate-key-pair-modal');
        browser.wait(EC.invisibilityOf(modal));
        modal.isPresent().should.eventually.be.false;
      });
      it('should generate a key pair', () => {
        element(by.buttonText('Generate Key')).click();
        const saveButton = element(by.buttonText('Save'));
        browser.wait(EC.elementToBeClickable(saveButton), 30000);
        $('.modal-body').getText().should.eventually
          .contain('Your new signing key has been generated.');
        element(by.brModel('$ctrl.model.key.label')).getAttribute('value')
          .should.eventually.equal('Signing Key 1');
        saveButton.click();
        var modal = $('br-generate-key-pair-modal');
        browser.wait(EC.invisibilityOf(modal));
        modal.isPresent().should.eventually.be.false;
        key.keyList().should.eventually.have.same.members(['Signing Key 1']);
      });
    }); // end generate-key-pair-modal
  }); // end br-key-component
});
