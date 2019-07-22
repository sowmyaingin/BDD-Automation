import { apiMethods } from 'test/e2e/specs/api/stepFunctions';

let actualResponseCode: string;

export = function performAPIValidations() {
  this.Given(/^user checks api is up and running$/, async () => {
    await apiMethods.initializeAPI();
  });

  this.When(/^user want to get post by id="(.*)"$/, async (id: string) => {
    actualResponseCode = await apiMethods.getPostById(Number(id));
  });

  this.Then(/^user recieves "(.*)" response from the api$/, async (expectedResponseCode: string) => {
    await apiMethods.testResponse(actualResponseCode, expectedResponseCode);
  });
};
