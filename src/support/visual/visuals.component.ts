import { browser, $ } from 'protractor';
import { expect } from '../assert/expect';
import { elemHelper } from '../../utils';

export class VisualMatcher {
  async checkElementImageIsMatched(element, savedImageName: string) {
    await elemHelper
      .isElementDisplayed($(element))
      .then(async () => {
        expect(await browser.imageComparison.checkElement($(element), savedImageName)).to.be.equal(0);
      })
      .catch(err => Promise.reject(err));
  }

  async checkFullPageImageIsMatched(savedImageName: string) {
    expect(
      await browser.imageComparison.checkFullPageScreen(savedImageName, {
        fullPageScrollTimeout: '1500'
      })
    ).to.be.equal(0);
  }
}
