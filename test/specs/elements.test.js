import { expect, browser } from '@wdio/globals';
import { elements } from '../../build/index.js';

import { login } from '../helpers.js';

const site = 'https://www.saucedemo.com/';

describe('Elements', () => {
    beforeEach(async () => {
        await browser.url(site);
    });

    it('findElementWithTextFromGroup', async () => {
        const element = await elements.findElementWithTextFromGroup(
            'h4',
            'Accepted usernames are:'
        );
        expect(element).not.toBe(null);
        expect(await element.getText()).toBe('Accepted usernames are:');
        const element2 = await elements.findElementWithTextFromGroup(
            'h4',
            'Does not exist'
        );
        expect(element2).toBe(null);
    });

    it('clickWithText', async () => {
        await login();
        await elements.clickWithText(
            '[data-test="inventory-item-name"]',
            'Sauce Labs Backpack'
        );
        const element = await elements.findElementWithTextFromGroup(
            '.inventory_details_name',
            'Sauce Labs Backpack'
        );
        expect(element).not.toBe(null);
    });

    it('clickwithText exception', async () => {
        const elementSelector = 'h4';
        const elementText = 'Does not exist';
        try {
            await elements.clickWithText(elementSelector, elementText, {
                timeout: 500,
            });
        } catch (error) {
            expect(error.message).toBe(
                `Element with text "${elementText}" and selector "${elementSelector}" not found.`
            );
        }
    });
});
