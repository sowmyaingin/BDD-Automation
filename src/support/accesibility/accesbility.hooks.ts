import { runAxeTest } from 'protractor-axe-html-report-plugin';
import { expect } from '../assert/expect';

export = function() {
  this.After({ tags: ['@accessibility'] }, async () => {
    const result: JSON = await runAxeTest('Page Level Accesibility Check');
    await expect(JSON.stringify(result), 'check accesibility is not violated-->').to.containIgnoreCase('violations').to.be.false;
  });

  this.Given(/^user check the accesibility for element "(.*)"$/, async (element: string) => {
    const elementAccesibilityResult: JSON = await runAxeTest(`Element Selector: ${element}`, element);
    await expect(JSON.stringify(elementAccesibilityResult), 'check accesibility is not violated-->').to.containIgnoreCase('violations').to.be.false;
  });
};
