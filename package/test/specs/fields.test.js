import { browser, $ } from '@wdio/globals';
import { fields } from '../../build/index.js';

const site = 'https://www.saucedemo.com/';

describe('Fields', () => {
    beforeAll(async () => {
        await browser.url(site);
    });

    it('hasValue', async () => {
        const inputField = await $('input');
        await inputField.setValue('something');
        await fields.hasValue('input', 'something');
        await fields.hasValue('input', 'some', false);
    });

    it('doesNotHaveValue', async () => {
        const inputField = await $('input');
        await inputField.setValue('something');
        await fields.doesNotHaveValue('input', 'something else');
    });

    it('appendValue', async () => {
        const inputField = await $('input');
        await inputField.setValue('something');
        await fields.appendValue('input', ' else');
        await fields.hasValue('input', 'something else');
    });

    it('prependValue', async () => {
        const inputField = await $('input');
        await inputField.setValue('something');
        await fields.prependValue('input', 'else ');
        await fields.hasValue('input', 'else something');
    });
});
