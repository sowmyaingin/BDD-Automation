import { browser, Config } from 'protractor';
import * as appRootpath from 'app-root-path';

const rootPath = appRootpath.resolve('/');
const transformDirPath = appRootpath.resolve('/transform');
const driverPath = appRootpath.resolve('/drivers');

export const config: Config = {
  // seleniumAddress: "http://INENGHOSHA1L1C:4444/wd/hub",
  // SELENIUM_PROMISE_MANAGER: false,

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

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        useAutomationExtension: false,
        args: ['--disable-gpu', '--disable-extensions']
      }
    },
    {
      browserName: 'firefox',
      acceptSslCerts: true,
      trustAllSSLCertificates: true,
      acceptInsecureCerts: true,
      ACCEPT_SSL_CERTS: true
    },

    {
      browserName: 'internet explorer',
      ignoreProtectedModeSettings: true,
      platform: 'ANY',
      args: ['--silent', '--no-sandbox', '--test-type=browser', '--lang=US', '--start-maximized']
    }
  ],

  maxSessions: 1,

  localSeleniumStandaloneOpts: {
    jvmArgs: ['-Dwebdriver.gecko.driver=' + driverPath + '/geckodriver-v0.24.0.exe']
  },

  onPrepare: () => {
    require('ts-node/register');
    require('tsconfig-paths/register');
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  }

  // restartBrowserBetweenTests: false
};
