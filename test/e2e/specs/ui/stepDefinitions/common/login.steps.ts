import { loginFunctions } from 'test/e2e/specs/ui/stepFunctions';

export = function performLoginValidations() {
  this.Given(/^user navigate to the target login page$/, async () => {
    loginFunctions.launchLoginUrl();
  });

  this.When(/^user enter "(.*)" and "(.*)"$/, async (username: string, password: string) => {
    await loginFunctions.setUserName(username);
    await loginFunctions.setUserPassword(password);
  });

  this.When(/^user click the login button$/, async () => {
    await loginFunctions.clickLoginBtn();
  });

  this.Then(/^user should successfully login$/, async () => {
    await loginFunctions.checkLoginSuccess();
  });

  this.Given(/^user is at user page$/, async () => {
    await loginFunctions.launchLoginUrl();
    await loginFunctions.setUserName('admin');
    await loginFunctions.setUserPassword('admin');
    await loginFunctions.clickLoginBtn();
    await loginFunctions.checkLoginSuccess();
  });
};
