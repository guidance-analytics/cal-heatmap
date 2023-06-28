var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { select } from 'd3-selection';
import merge from 'lodash-es/merge';
/**
 * @jest-environment jsdom
 */
import CalHeatmap from '../../src/CalHeatmap';
describe('DomainLabelPainter', () => {
    const defaultOptions = {
        range: 1,
        domain: { type: 'year' },
        subDomain: { type: 'month' },
    };
    let cal;
    beforeEach(() => {
        cal = new CalHeatmap();
        select('body').append('div').attr('id', 'cal-heatmap');
    });
    afterEach(() => {
        cal.destroy();
        document.getElementsByTagName('html')[0].innerHTML = '';
    });
    describe('when positionned on top', () => {
        it('aligns the text on the left', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'top', textAlign: 'start' } },
            }));
            expect(select('.ch-domain-text').attr('x')).toBe('0');
            expect(select('.ch-domain-text').attr('y')).toBe(`${25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('start');
        }));
        it('aligns the text on the middle', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'top', textAlign: 'middle' } },
            }));
            const width = +select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width / 2}`);
            expect(select('.ch-domain-text').attr('y')).toBe(`${25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('middle');
        }));
        it('aligns the text on the right', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'top', textAlign: 'end' } },
            }));
            const width = +select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width}`);
            expect(select('.ch-domain-text').attr('y')).toBe(`${25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('end');
        }));
    });
    describe('when positionned on bottom', () => {
        it('aligns the text on the left', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'bottom', textAlign: 'start' } },
            }));
            expect(select('.ch-domain-text').attr('x')).toBe('0');
            expect(select('.ch-domain-text').attr('y')).toBe(`${10 + 25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('start');
        }));
        it('aligns the text on the middle', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'bottom', textAlign: 'middle' } },
            }));
            const width = select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${+width / 2}`);
            expect(select('.ch-domain-text').attr('y')).toBe(`${10 + 25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('middle');
        }));
        it('aligns the text on the right', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'bottom', textAlign: 'end' } },
            }));
            const width = select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width}`);
            expect(select('.ch-domain-text').attr('y')).toBe(`${10 + 25 / 2}`);
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('end');
        }));
    });
    describe('when positionned on the left', () => {
        it('aligns the text on the left', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: {
                    label: { position: 'left', textAlign: 'start', width: 50 },
                },
            }));
            expect(select('.ch-domain-text').attr('x')).toBe('0');
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('start');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('50');
        }));
        it('aligns the text on the middle', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: {
                    label: { position: 'left', textAlign: 'middle', width: 50 },
                },
            }));
            expect(select('.ch-domain-text').attr('x')).toBe('25');
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('middle');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('50');
        }));
        it('aligns the text on the right', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'left', textAlign: 'end', width: 50 } },
            }));
            expect(select('.ch-domain-text').attr('x')).toBe('50');
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('end');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('50');
        }));
        it.todo('rotate the text left');
        it.todo('rotate the text right');
    });
    describe('when positionned on the right', () => {
        it('aligns the text on the left', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: {
                    label: { position: 'right', textAlign: 'start', width: 50 },
                },
            }));
            const width = +select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width - 50}`);
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('start');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('0');
        }));
        it('aligns the text on the middle', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: {
                    label: { position: 'right', textAlign: 'middle', width: 50 },
                },
            }));
            const width = +select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width - 50 + 25}`);
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('middle');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('0');
        }));
        it('aligns the text on the right', () => __awaiter(void 0, void 0, void 0, function* () {
            yield cal.paint(merge(defaultOptions, {
                domain: { label: { position: 'right', textAlign: 'end', width: 50 } },
            }));
            const width = +select('.ch-domain').attr('width');
            expect(select('.ch-domain-text').attr('x')).toBe(`${width}`);
            expect(select('.ch-domain-text').attr('y')).toBe('0');
            expect(select('.ch-domain-text').attr('text-anchor')).toBe('end');
            expect(select('.ch-domain-text').attr('dominant-baseline')).toBe('hanging');
            expect(select('.ch-subdomain-container').attr('x')).toBe('0');
        }));
        it.todo('rotate the text left');
        it.todo('rotate the text right');
    });
});
