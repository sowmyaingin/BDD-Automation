import { ElementFinder, element, by } from 'protractor';

class LoginPage {
  public usernameField: ElementFinder;
  public passwordField: ElementFinder;
  public loginBtn: ElementFinder;
  public loginSuccessMsg: ElementFinder;
  public userstab: ElementFinder;
  public VIEWaction: ElementFinder;
  public urlRoute: string;

  constructor() {
    this.urlRoute = '/login';
    this.usernameField = element(by.css('#username'));
    this.passwordField = element(by.css('#password'));
    this.loginBtn = element(by.css('#login'));
    this.loginSuccessMsg = element(by.css('a[href*="/login"]'));
  }
}
export let loginPage = new LoginPage();
