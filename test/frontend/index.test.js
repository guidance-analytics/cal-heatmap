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
import { select, selectAll } from 'd3-selection';
/**
 * @jest-environment jsdom
 */
import CalHeatmap from '../../src/CalHeatmap';
// @ts-ignore
import suite from './export';
suite.forEach((testSuite) => {
    describe(testSuite.title, () => {
        let cal;
        beforeEach(() => {
            // @ts-ignore
            window.defaultOptions = {
                animationDuration: 100,
                domain: { type: 'year' },
                subDomain: { type: 'month' },
                range: 1,
            };
            cal = new CalHeatmap();
            select('body').html('');
            select('body').append('div').attr('id', 'cal-heatmap');
        });
        afterEach(() => {
            cal.destroy();
            document.getElementsByTagName('html')[0].innerHTML = '';
        });
        testSuite.tests.forEach((test) => {
            const d3 = { select, selectAll };
            if (test.expectations) {
                it(test.title, () => __awaiter(void 0, void 0, void 0, function* () {
                    let executeReturn;
                    const setupPromise = test.setup(cal, d3);
                    yield setupPromise;
                    if (test.preExpectations) {
                        const results = test.preExpectations.map((e) => __awaiter(void 0, void 0, void 0, function* () { 
                        // eslint-disable-next-line implicit-arrow-linebreak
                        return expect(e.current(d3)).toBe(e.expected()); }));
                        yield Promise.allSettled(results);
                    }
                    if (test.execute) {
                        const executePromise = test.execute(cal, d3);
                        executeReturn = yield executePromise;
                    }
                    test.expectations.forEach((e) => {
                        const current = e.current(d3);
                        if (e.notExpected) {
                            expect(current).not.toBe(e.notExpected(executeReturn));
                        }
                        if (e.expected) {
                            expect(current).toBe(e.expected(executeReturn));
                        }
                        if (e.expectedContain) {
                            expect(current).toContain(e.expectedContain(executeReturn));
                        }
                    });
                    expect.assertions(test.expectations.length +
                        (test.preExpectations ? test.preExpectations.length : 0));
                }), 5000);
            }
            else {
                it.todo(test.title);
            }
        });
    });
});
