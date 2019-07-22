import { browser, Config } from 'protractor';
import * as appRootpath from 'app-root-path';

const rootPath = appRootpath.resolve('/');
const transformDirPath = appRootpath.resolve('/transform');
const driverPath = appRootpath.resolve('/drivers');

export const config: Config = {
  seleniumAddress: 'http://INENGHOSHA1L1C:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,

  framework: 'custom',
  frameworkPath: require.resolve('serenity-js'),

  baseUrl: 'https://the-internet.herokuapp.com',

  allScriptsTimeout: 110000,

  specs: [rootPath + '/test/e2e/features/*.feature'],

  serenity: {
    dialect: 'cucumber',
    requirementsDirectory: `${process.cwd()}/test/e2e/features`
  },

  cucumberOpts: {
    require: [transformDirPath + '/**/*.js'],
    format: 'pretty',
    compiler: 'ts:ts-node/register'
  },

  capabilities: {
    browserName: 'internet explorer',
    ignoreProtectedModeSettings: true,
    platform: 'ANY',
    args: ['--silent', '--no-sandbox', '--test-type=browser', '--lang=US', '--start-maximized']

    // execute tests using n number of browsers running in parallel
    // shardTestFiles: true,
    // maxInstances: n
  },

  localSeleniumStandaloneOpts: {
    jvmArgs: ['-Dwebdriver.ie.driver=' + driverPath + '/iedriver.exe']
  },
  onPrepare: () => {
    require('ts-node/register');
    require('tsconfig-paths/register');
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  }

  // restartBrowserBetweenTests: false
};
