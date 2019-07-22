import { VisualMatcher } from './visuals.component';

const visual: VisualMatcher = new VisualMatcher();

export = function performVisualRegression() {
  this.Then(/^the element "(.*)" should match with the golden image named "(.*)"$/, async (element, saveElement) => {
    await visual.checkElementImageIsMatched(element, saveElement);
  });

  this.Then(/^full page screen should match with the golden image named "(.*)"$/, async expectedFullScreenshot => {
    await visual.checkFullPageImageIsMatched(expectedFullScreenshot);
  });
};
