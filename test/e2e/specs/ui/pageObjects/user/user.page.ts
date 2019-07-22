import { ElementFinder, element, by } from 'protractor';

class UserPage {
  public userButton: ElementFinder;
  public userTable: ElementFinder;
  public urlRoute: string;

  constructor() {
    this.urlRoute = '/user';
    this.userButton = element(by.css("button[ng-reflect-router-link='/user']"));
    this.userTable = element(by.css('.table'));
  }
}

export let userPage = new UserPage();
