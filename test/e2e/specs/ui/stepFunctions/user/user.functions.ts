import { expect } from 'src/support/assert/expect';
import { elemHelper } from 'src/utils';
import { userPage } from '../../pageObjects/user/user.page';

class UserFunctions {
  async clickUserBtn() {
    await elemHelper.click(userPage.userButton);
  }
  async checkUserTableIsPresent() {
    await expect(userPage.userTable, 'check user table is present').to.be.present;
  }
}

export let userFunctions = new UserFunctions();
