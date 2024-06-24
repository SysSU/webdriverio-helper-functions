declare global {
    // eslint-disable-next-line no-var
    var browser: WebdriverIO.Browser;
}

import { expect as expectWDIO } from '@wdio/globals';
import getOptions, { OptionsInterface } from '../helpers/getOptions';

import { waitForElementToExist as waitToExist } from './waits';

/**
 * Accepts a field selector and returns the value of that field.
 */
async function getValue(
    selector: string,
    options: OptionsInterface = {}
): Promise<string> {
    const { useBrowser, timeout } = getOptions(options);

    await waitToExist(selector, { useBrowser, timeout });
    const element = await useBrowser.$(selector);
    return await element.getValue();
}

/**
 *  Accepts a field selector and expected partial or full text of that field and then checks if the field has that exact or partial text.
 * @throws {Error} if the field does not have the expected text.
 * @throws {Error} if the field does not exist.
 */
async function hasValue(
    selector: string,
    textToCheck: string,
    exactMatch: boolean = true,
    options: Omit<OptionsInterface, 'timeout'> = {}
) {
    const { useBrowser } = getOptions(options);
    const elementText = await getValue(selector, { useBrowser });
    if (exactMatch) {
        expectWDIO(elementText).toEqual(textToCheck);
        // WDIO expect with cussom message
    } else {
        expectWDIO(elementText).toContain(textToCheck);
    }
}

/**
 * Accepts a field selector and checks if the field does not have the expected partial or full text.
 * @throws {Error} if the field has the expected text.
 */
async function doesNotHaveValue(
    selector: string,
    textToCheck: string,
    exactMatch: boolean = true,
    options: Omit<OptionsInterface, 'timeout'> = {}
) {
    const { useBrowser } = getOptions(options);
    const elementText = await getValue(selector, { useBrowser });
    if (exactMatch) {
        expectWDIO(elementText).not.toEqual(textToCheck);
        // WDIO expect with cussom message
    } else {
        expectWDIO(elementText).not.toContain(textToCheck);
    }
}

/**
 * Appends text to the field value.
 * @throws {Error} if the field does not exist.
 */
async function appendValue(
    selector: string,
    textToAppend: string,
    options: OptionsInterface = {}
) {
    const { useBrowser, timeout } = getOptions(options);
    await waitToExist(selector, { useBrowser, timeout });
    const element = await useBrowser.$(selector);
    const elementText = await element.getValue();
    await element.setValue(elementText + textToAppend);
}

/**
 * Appends text to the field value.
 * @throws {Error} if the field does not exist.
 */
async function prependValue(
    selector: string,
    textToPrepend: string,
    options: OptionsInterface = {}
) {
    const { useBrowser, timeout } = getOptions(options);
    await waitToExist(selector, { useBrowser, timeout });
    const element = await useBrowser.$(selector);
    const elementText = await element.getValue();
    await element.setValue(textToPrepend + elementText);
}

export { hasValue, doesNotHaveValue, appendValue, prependValue };
