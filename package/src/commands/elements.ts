declare global {
    // eslint-disable-next-line no-var
    var browser: WebdriverIO.Browser;
}

import * as _ from 'lodash';
import {
    waitForElementToExist as waitToExist,
    waitForElementToExistAndClick as waitToExistAndClick,
    waitForElemmentVisible as waitForVisible,
    waitForElementToHaveText as waitToHaveText,
} from './waits';
import getOptions, { OptionsInterface } from '../helpers/getOptions';

/**
 * Finds and returns the element that matches the text from the group of selectors
 * @throws {Error} if the element is not found.
 */
async function findElementWithTextFromGroup(
    groupSelector: string,
    textToSearch: string,
    index: number = 0,
    options: OptionsInterface = {}
): Promise<WebdriverIO.Element | null> {
    const { useBrowser, timeout } = getOptions(options);
    await waitToExist(groupSelector, { useBrowser, timeout });
    const group = await useBrowser.$$(groupSelector);
    const elements = await group.filter(async (element) =>
        (await element.getText()).includes(textToSearch)
    );
    if (!_.isEmpty(elements)) {
        return elements[index];
    }
    return null;
}

/**
 * Finds the selector with text and clicks and if there are multiple elememts with the same text, it will click based on the index.
 * Waits until selector appears in the DOM.
 * @throws {Error} if the element is not found.
 */
async function clickWithText(
    selector: string,
    textToSearch: string,
    index: number = 0,
    options: OptionsInterface = {}
): Promise<void> {
    const { useBrowser, timeout } = getOptions(options);
    const element = await findElementWithTextFromGroup(
        selector,
        textToSearch,
        index,
        { useBrowser, timeout }
    );
    if (element) {
        await element.click();
    } else {
        throw Error(
            `Element with text "${textToSearch}" and selector "${selector}" not found.`
        );
    }
}

export {
    waitToExistAndClick,
    clickWithText,
    findElementWithTextFromGroup,
    waitForVisible,
    waitToHaveText,
};
