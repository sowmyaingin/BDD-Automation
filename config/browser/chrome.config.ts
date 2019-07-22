import { browser, Config } from 'protractor';
import * as appRootpath from 'app-root-path';

const rootPath = appRootpath.resolve('/');

export const config: Config = {
  // seleniumAddress: "http://INENGHOSHA1L1C:4444/wd/hub",
  // SELENIUM_PROMISE_MANAGER: false,

  framework: 'custom',
  frameworkPath: require.resolve('serenity-js'),

  // baseUrl: 'https://the-internet.herokuapp.com',
  baseUrl: 'http://localhost:4200',

  allScriptsTimeout: 110000,

  specs: [rootPath + '/test/e2e/features/*demo.ui.feature'],

  serenity: {
    dialect: 'cucumber',
    requirementsDirectory: `${process.cwd()}/test/e2e/features/demo.ui.feature`
  },
  cucumberOpts: {
    require: [rootPath + '/transform/**/*.js'],
    format: 'pretty',
    compiler: 'ts:ts-node/register'
  },

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      useAutomationExtension: false,
      args: [
        // "--headless",
        '--remote-debugging-port=9222',
        '--disable-gpu',
        '--disable-extensions'
      ]
    }

    // execute tests using n number of browsers running in parallel
    // shardTestFiles: true,
    // maxInstances: 20
  },

  plugins: [
    {
      // The module name
      package: 'protractor-image-comparison',
      options: {
        baselineFolder: rootPath + '/test/mocks/goldens/',
        formatImageName: `{tag}`,
        screenshotPath: rootPath + '/target/image-compare/',
        savePerInstance: true,
        // autoSaveBaseline: true,
        blockOutToolBar: true,
        clearRuntimeFolder: true
      }
    },

    {
      displayHelpUrl: false, // Displays the aXe help URL along with the error. Defaults to true.
      displayContext: true, // Displays the HTML of interest. Defaults to true.
      displayPasses: true, // Display pass results. Defaults to true.
      displayViolations: true, // Display vioaltions. Defaults to true.
      standardsToReport: [], // A list of standards to report on. If empty, reports on all standards.
      ignoreAxeFailures: true, // If true, aXe failures won't cause the whole test to fail. Defaults to false
      htmlReportPath: 'target/accesibility',
      package: 'protractor-axe-html-report-plugin'
    }
  ],

  onPrepare: () => {
    require('ts-node/register');
    require('tsconfig-paths/register');
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(true);
  }

  // restartBrowserBetweenTests: true
};
