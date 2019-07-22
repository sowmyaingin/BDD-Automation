import { browser, by, element, ElementFinder, ExpectedConditions, Key } from 'protractor';
import { code as dragAndDrop } from 'html-dnd';
import * as path from 'path';
import * as fs from 'fs';

import { logger } from '.';
import { Wait } from './wait';

/**
 * ElementHelper class contains the generic methods to handle element operations
 */
class ElementHelper {
  /**
   * This method helps to select the checkboxes
   * @param checkboxElement
   * @param selected
   */
  async selectCheckbox(checkboxElement: ElementFinder, selected: boolean) {
    const isCheckboxSelected = await checkboxElement.isSelected();
    if (selected !== isCheckboxSelected) {
      await checkboxElement.click();
    }
  }

  /**
   * this method hekps to type a text value in a textbox element
   * @param htmlElement
   * @param value
   */
  async typeValue(htmlElement: ElementFinder, value: any): Promise<void> {
    await htmlElement.clear();
    await browser.wait(ExpectedConditions.elementToBeClickable(htmlElement));
    await htmlElement.sendKeys(value);
  }

  /**
   * this method helps to type a date value in date input
   * @param dateInput
   * @param date
   */
  async typeDate(dateInput: ElementFinder, date: string): Promise<void> {
    logger.info(`Inputting date into: ${dateInput.locator()} with value: ${JSON.stringify(date)}`);
    await dateInput.click();
    await dateInput.clear();
    return dateInput.sendKeys(date);
  }

  /**
   * this method helps to selece an option from single select element
   * @param selectOptionLocator
   * @param textToSelect
   */
  async selectValueFromSingleSelectOption(selectOptionLocator: ElementFinder, textToSelect: string) {
    await this.browserWaitElementClickable(selectOptionLocator);
    await selectOptionLocator.click();
    await this.browserWaitElementClickable(element(by.cssContainingText('mat-option > span.mat-option-text', textToSelect)));
    logger.info(`Clicking element containing text: ${textToSelect}`);
    await element(by.cssContainingText('mat-option > span.mat-option-text', textToSelect)).click();
    await browser.waitForAngular();
  }

  /**
   * this method helps to select an option from multiple select element by losing focus mechanism
   * @param selectOptionLocator
   * @param textToSelect
   * @param loseFocusLocator
   */
  async selectValueFromMultipleSelectOption(selectOptionLocator: ElementFinder, textToSelect: string, loseFocusLocator: ElementFinder) {
    await browser.wait(
      ExpectedConditions.elementToBeClickable(selectOptionLocator),
      Wait.normal,
      `Select option element is not clickable: ${selectOptionLocator}`
    );
    await selectOptionLocator.click();
    const option = element(by.cssContainingText('mat-option > span.mat-option-text', textToSelect));
    await browser.wait(ExpectedConditions.elementToBeClickable(option), Wait.normal, `Element with text: ${textToSelect} is not visible`);
    await option.click();
    // dismiss popover with options
    await browser.wait(ExpectedConditions.elementToBeClickable(loseFocusLocator), Wait.normal, `Element to lose focus is not clickable`);
    return loseFocusLocator.click();
  }

  /**
   * this method checks one element contains all the required values. Method returns true if it contains all the required values.
   * @param elementToCheck
   * @param values
   */
  async doesElementContainAllValues(elementToCheck: ElementFinder, ...values: string[]): Promise<boolean> {
    return elementToCheck.getText().then(text => {
      // element text containsAllValues
      return values.reduce((previous, current) => {
        return text.indexOf(current) !== -1 && previous;
      }, true);
    });
  }

  /**
   * this method awaits the execution untill an element is clickable
   * @param selectOptionLocator
   */
  async browserWaitElementClickable(selectOptionLocator: ElementFinder) {
    logger.info(`Waiting for element of locator: ${selectOptionLocator.locator()} to be clickable`);
    return browser.wait(
      ExpectedConditions.elementToBeClickable(selectOptionLocator),
      Wait.normal,
      `Element is not clickable: ${selectOptionLocator}`
    );
  }

  /**
   * this method awaits the execution untill an element is visible
   * @param selectOptionLocator
   */
  async browserWaitElementVisible(selectOptionLocator: ElementFinder) {
    logger.info(`Waiting for element of locator: ${selectOptionLocator.locator()} to be visible`);
    return browser.wait(ExpectedConditions.visibilityOf(selectOptionLocator), Wait.normal, `Element is not visible: ${selectOptionLocator}`);
  }

  /**
   * this method awaits the execution untill an element is displayed.
   * @param selectOptionLocator
   */
  async isElementDisplayed(selectOptionLocator: ElementFinder) {
    await logger.info(`Waiting for element to be displayed: ${selectOptionLocator.locator()} to be displayed`);
    return browser.wait(ExpectedConditions.presenceOf(selectOptionLocator), Wait.normal, `Element is not displayed: ${selectOptionLocator}`);
  }

  /**
   * this method hepls to get text from an element
   * @param element
   */
  async getText(_element: ElementFinder) {
    const item = require('protractor').promise.defer();
    await browser.wait(() => {
      return _element.getText().then(value => {
        const result = value !== '';
        if (result) {
          item.fulfill(value);
        }
        return result;
      });
    });
    return item.promise;
  }

  /**
   * this method helps to get current url of the page
   */
  async getCurrentURL() {
    const item = require('protractor').promise.defer();
    await browser.wait(() => {
      return browser.getCurrentUrl().then(value => {
        const result = value !== '';
        if (result) {
          item.fulfill(value);
        }
        return result;
      });
    });
    return item.promise;
  }

  /**
   * this method helps to click to a particualr element
   * @param element
   */
  async click(_element: ElementFinder) {
    await this.isElementDisplayed(_element)
      .then(async () => {
        await _element.click();
      })
      .catch(err => {
        logger.error(err);
        Promise.reject(err);
      });
  }

  /**
   * this method helps to clear the data from a text fiels
   * @param element
   */
  async clear(_element: ElementFinder) {
    await this.isElementDisplayed(_element)
      .then(async () => {
        await _element.clear();
        await _element.sendKeys(Key.chord(Key.CONTROL, 'a'));
      })
      .catch(err => {
        logger.error(err);
        Promise.reject(err);
      });
  }

  /**
   * this method helps to write value in text field
   * @param element
   * @param text
   */
  async sendKeys(_element: ElementFinder, text: string) {
    await this.isElementDisplayed(_element)
      .then(async () => {
        await _element.sendKeys(text);
      })
      .catch(err => {
        logger.error(err);
        Promise.reject(err);
      });
  }

  /**
   * this method helps to scroll to a certian element to make the element visible in the page
   * @param element
   */
  async scrollIntoView(_element: ElementFinder) {
    this.isElementDisplayed(_element).then(() => browser.executeScript('arguments[0].scrollIntoView()', _element.getWebElement()));
  }

  /**
   * this method helps to drag and drop a element into another element
   * @param dragElement
   * @param dropElement
   */
  async dragAndDrop(dragElement: ElementFinder, dropElement: ElementFinder) {
    browser.executeScript(dragAndDrop, dragElement, dropElement);
  }

  /**
   * this method helps to upload a file from the system to a certain drop element
   * @param fileName
   * @param element
   */
  async uploadFile(fileName: string, _element: ElementFinder) {
    const filePath = path.resolve(__dirname, fileName);
    return new Promise((resolve, reject) => {
      fs.stat(filePath, rslt => {
        if (rslt == null) {
          _element.sendKeys(filePath);
          resolve(true);
        } else {
          const msg = rslt.code === 'ENOENT' ? 'File does not exist!!!' : `Some other error: ${rslt.code}`;
          logger.error(msg);
          reject(msg);
        }
      });
    });
  }

  /**
   * this method helps to get the current date and time
   */
  async getCurrentDateTime() {
    const today = new Date();
    const tDate = `${today.getMonth() + 1}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    return tDate;
  }

  /**
   * this element helps to get the attribute value of an element
   * @param element
   * @param attrName
   */
  async getAttribute(_element: ElementFinder, attrName) {
    const item = require('protractor').promise.defer();
    await browser.wait(() => {
      return _element.getAttribute(attrName).then(value => {
        const result = value !== '';
        if (result) {
          item.fulfill(value);
        }
        return result;
      });
    });
    return item.promise;
  }

  /**
   * this method helps to get the css value of an element
   * @param element
   * @param cssValue
   */
  async getCssValue(_element: ElementFinder, cssValue) {
    const item = require('protractor').promise.defer();
    await browser.wait(() => {
      return _element.getCssValue(cssValue).then(value => {
        const result = value !== '';
        if (result) {
          item.fulfill(value);
        }
        return result;
      });
    });
    return item.promise;
  }
}

export let elemHelper = new ElementHelper();
