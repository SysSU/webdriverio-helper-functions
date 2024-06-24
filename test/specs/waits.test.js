import { browser } from '@wdio/globals';
import { waits } from '../../build/index.js';

const site = 'https://www.saucedemo.com/';

describe('Fields', () => {
    beforeAll(async () => {
        await browser.url(site);
    });

    it('waitForElementToExist', async () => {
        await waits.waitForElementToExist('input');
    });

    it('waitForElementToExist exception', async () => {
        try {
            await waits.waitForElementToExist('inputx', { timeout: 500 });
        } catch (error) {
            expect(error.message).toContain(
                'element ("inputx") still not existing after 500ms'
            );
        }
    });

    it('waitForElementToExistAndClick', async () => {
        await waits.waitForElementToExistAndClick('#login-button');
        await waits.waitForElementToExist('h3[data-test="error"]');
    });

    it('waitForElemmentVisible', async () => {
        await waits.waitForElemmentVisible('input');
    });

    it('waitForElementToHaveText', async () => {
        await waits.waitForElementToHaveText('h4', 'Accepted usernames are:');
    });

    it('waitForElementToHaveText timeout exception', async () => {
        try {
            await waits.waitForElementToHaveText('h4', 'Does not exist', {
                timeout: 1000,
            });
        } catch (error) {
            expect(error.message).toContain(
                '("h4") with ("Does not exist") is not visible.'
            );
        }
    });
});
