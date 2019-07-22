import { browser } from 'protractor';

export = function() {
  this.Before({ timeout: 100 * 1000 }, async () => {
    await browser
      .manage()
      .window()
      .maximize();
    // await browser.get(browser.baseUrl);
  });

  this.After({ timeout: 100 * 1000 }, async () => {
    await browser.executeScriptWithDescription(
      ['window.sessionStorage.clear();', 'window.localStorage.clear();'].join('\n'),
      'Clean up local storage'
    );
    // await browser.restart();
  });
};
