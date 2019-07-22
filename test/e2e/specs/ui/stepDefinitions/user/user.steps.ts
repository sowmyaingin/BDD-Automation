import { userFunctions } from '../../stepFunctions/user/user.functions';

export = function performLoginValidations() {
  this.When(/^user clicks on User Tab in user page$/, async () => {
    userFunctions.clickUserBtn();
  });

  this.When(/^user should see all the user details in user page$/, async () => {
    userFunctions.checkUserTableIsPresent();
  });
};
