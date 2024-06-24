declare global {
    // eslint-disable-next-line no-var
    var browser: WebdriverIO.Browser;
}

import config from '../config';

export interface OptionsInterface {
    timeout?: number;
    useBrowser?: WebdriverIO.Browser;
}

interface getOptionsReturnInterface {
    timeout: number;
    useBrowser: WebdriverIO.Browser;
}

export default function getOptions(
    options: OptionsInterface
): getOptionsReturnInterface {
    const timeout = options.timeout || config.defaultTimeout;
    const useBrowser = options.useBrowser || browser;
    return { timeout, useBrowser };
}
