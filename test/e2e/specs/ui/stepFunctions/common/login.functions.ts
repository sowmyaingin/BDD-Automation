import { browser } from 'protractor';
import { loginPage } from 'test/e2e/specs/ui/pageObjects';
import { expect } from 'src/support/assert/expect';
import { elemHelper } from 'src/utils';

class LoginFunctions {
  async launchLoginUrl() {
    await browser.get(browser.baseUrl + loginPage.urlRoute);
  }
  async setUserName(userName: string) {
    await elemHelper.sendKeys(loginPage.usernameField, userName);
  }
  async setUserPassword(password: string) {
    await elemHelper.sendKeys(loginPage.passwordField, password);
  }
  async clickLoginBtn() {
    await elemHelper.click(loginPage.loginBtn);
  }
  async checkLoginSuccess() {
    await expect(loginPage.loginSuccessMsg, 'Logout').to.be.present;
  }
}

export let loginFunctions = new LoginFunctions();
