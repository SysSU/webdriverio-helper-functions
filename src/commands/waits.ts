declare global {
    // eslint-disable-next-line no-var
    var browser: WebdriverIO.Browser;
}

import getOptions, { OptionsInterface } from '../helpers/getOptions';

/**
 * Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @throws {Error} if the element is not visible.
 */
async function waitForElementToExist(
    selector: string,
    options: OptionsInterface = {}
) {
    const { useBrowser, timeout } = getOptions(options);
    const element = await useBrowser.$(selector);
    await element.waitForExist({ timeout });
    await element.moveTo({});
}

/**
 * Clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Waits until selector appears in the DOM. And clicks only the visible element.
 * @throws {Error} if the element is not visible.
 */
async function waitForElementToExistAndClick(
    selector: string,
    index: number = 0,
    options: OptionsInterface = {}
) {
    const { useBrowser, timeout } = getOptions(options);
    await waitForElementToExist(selector, { useBrowser, timeout });
    const element = useBrowser.$$(selector)[index];
    if (element.isDisplayedInViewport()) {
        element.click();
    } else {
        throw Error(`Element with selector "${selector}" not found.`);
    }
}

/**
 * Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * and waits until the selector is visible
 * @throws {Error} if the element is not visible.
 */
async function waitForElemmentVisible(
    selector: string,
    options: OptionsInterface = {}
) {
    const { useBrowser, timeout } = getOptions(options);
    await waitForElementToExist(selector, { useBrowser, timeout });
    await useBrowser.waitUntil(async function () {
        return await useBrowser.$(selector).isDisplayedInViewport();
    });
}

/**
 * Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and
 * scroll the page to that element in the screen and waits until the selector with text is visible
 * @throws {Error} if the element with the text is not visible.
 */
async function waitForElementToHaveText(
    selector: string,
    textToSearch: string,
    options: OptionsInterface = {}
) {
    const { timeout, useBrowser } = getOptions(options);
    await waitForElementToExist(selector, { useBrowser, timeout });
    const group = await useBrowser.$$(selector);
    await useBrowser.waitUntil(
        async function () {
            for (let i = 0; i < group.length; i++) {
                const element = group[i];
                const elementText = await element.getText();
                if (elementText.includes(textToSearch)) {
                    return true;
                }
            }
        },
        {
            timeout: timeout,
            timeoutMsg: `("${selector}") with ("${textToSearch}") is not visible.`,
        }
    );
}

export {
    waitForElementToExist,
    waitForElementToExistAndClick,
    waitForElemmentVisible,
    waitForElementToHaveText,
};
