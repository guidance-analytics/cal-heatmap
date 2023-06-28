var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-title */
import { Builder } from 'selenium-webdriver';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
// @ts-ignore
import suite from '../frontend/export';
function getArrowFunctionBody(f) {
    const matches = f
        .toString()
        .match(/^(?:\s*\(?(?:\s*\w*\s*,?\s*)*\)?\s*?=>\s*){?([\s\S]*)}?$/);
    if (!matches) {
        return null;
    }
    const firstPass = matches[1];
    // Needed because the RegExp doesn't handle the last '}'.
    const secondPass = (firstPass.match(/{/g) || []).length ===
        (firstPass.match(/}/g) || []).length - 1 ?
        firstPass.slice(0, firstPass.lastIndexOf('}')) :
        firstPass;
    return secondPass;
}
const Runner = (name, file, customCapabilities = { 'bstack:options': {}, browserName: 'Chrome' }) => {
    if (process.env.LOCAL === '1' &&
        Object.keys(customCapabilities['bstack:options']).length > 0) {
        // eslint-disable-next-line jest/no-disabled-tests, jest/expect-expect
        it.skip('is skipped on local', () => { });
        return;
    }
    let timeout = 2000;
    if (process.env.LOCAL !== '1') {
        jest.retryTimes(2);
        timeout = 10000;
    }
    describe(name, () => {
        let driver;
        let driverBuilder;
        if (process.env.LOCAL === '1') {
            driverBuilder = () => new Builder().forBrowser('chrome').build();
        }
        else {
            const username = process.env.BROWSERSTACK_USERNAME;
            const accesskey = process.env.BROWSERSTACK_ACCESS_KEY;
            const capabilities = Object.assign(Object.assign({}, customCapabilities), { 'bstack:options': Object.assign({ projectName: 'Testing CalHeatmap and d3js on browsers matrix', local: false }, customCapabilities['bstack:options']) });
            driverBuilder = () => new Builder()
                .usingServer(`https://${username}:${accesskey}@hub-cloud.browserstack.com/wd/hub`)
                .withCapabilities(capabilities)
                .build();
        }
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            driver = yield driverBuilder();
        }), 45000);
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield driver.quit();
        }), 20000);
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            let prefix = 'https://cal-heatmap.com/tests/';
            if (process.env.LOCAL === '1') {
                prefix = 'http://localhost:3003/test/e2e/';
            }
            yield driver.get(`${prefix}${file}`);
            yield driver.executeScript(`window.defaultOptions = {
          animationDuration: 100,
          domain: { type: 'year' },
          subDomain: { type: 'month' },
          range: 1,
        };`);
        }), timeout);
        suite.forEach((testSuite) => {
            describe(testSuite.title, () => {
                testSuite.tests.forEach((test) => {
                    if (test.expectations) {
                        it(test.title, () => __awaiter(void 0, void 0, void 0, function* () {
                            let executeReturn;
                            const setupPromise = yield driver.executeScript(getArrowFunctionBody(test.setup));
                            yield setupPromise;
                            if (test.preExpectations) {
                                const results = test.preExpectations.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                                    const current = yield driver.executeScript(getArrowFunctionBody(e.current));
                                    expect(current).toBe(e.expected());
                                }));
                                yield Promise.allSettled(results);
                            }
                            if (test.execute) {
                                const executePromise = yield driver.executeScript(getArrowFunctionBody(test.execute));
                                executeReturn = yield executePromise;
                            }
                            const results = test.expectations.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                                const current = yield driver.executeScript(getArrowFunctionBody(e.current));
                                if (e.notExpected) {
                                    expect(current).not.toBe(e.notExpected(executeReturn));
                                }
                                if (e.expected) {
                                    expect(current).toBe(e.expected(executeReturn));
                                }
                                if (e.expectedContain) {
                                    expect(current).toContain(e.expectedContain(executeReturn));
                                }
                            }));
                            return Promise.allSettled(results).then(() => {
                                expect.assertions(test.expectations.length +
                                    (test.preExpectations ? test.preExpectations.length : 0));
                            });
                        }), timeout);
                    }
                    else {
                        it.todo(test.title);
                    }
                });
            });
        });
    });
};
// eslint-disable-next-line jest/no-export
export default Runner;
