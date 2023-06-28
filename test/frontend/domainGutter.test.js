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
/**
 * @jest-environment jsdom
 */
import CalHeatmap from '../../src/CalHeatmap';
describe('on horizontal scroll', () => {
    let cal;
    beforeEach(() => {
        cal = new CalHeatmap();
        select('body').append('div').attr('id', 'cal-heatmap');
    });
    afterEach(() => {
        cal.destroy();
        document.getElementsByTagName('html')[0].innerHTML = '';
    });
    [0, 50].forEach((gutter) => {
        describe(`on domain gutter = ${gutter}`, () => {
            it('renders the given domain gutter', () => __awaiter(void 0, void 0, void 0, function* () {
                const baseWidth = 120;
                yield cal.paint({
                    range: 2,
                    domain: { type: 'year', gutter, label: { text: null } },
                    subDomain: { type: 'month', gutter: 0, width: 10 },
                });
                expect(select('#cal-heatmap').select('.ch-domain:nth-child(1)').attr('x')).toBe('0');
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1)')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1) .ch-domain-bg')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap').select('.ch-domain:nth-child(2)').attr('x')).toBe(`${baseWidth + gutter}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2)')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2) .ch-domain-bg')
                    .attr('width')).toBe(`${baseWidth}`);
            }));
            it('does not affect the domain height', () => __awaiter(void 0, void 0, void 0, function* () {
                const baseHeight = 10;
                yield cal.paint({
                    range: 2,
                    domain: { type: 'year', gutter, label: { text: null } },
                    subDomain: { type: 'month', gutter: 0, width: 10 },
                });
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1)')
                    .attr('height')).toBe(`${baseHeight}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2)')
                    .attr('height')).toBe(`${baseHeight}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1) .ch-domain-bg')
                    .attr('height')).toBe(`${baseHeight}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2) .ch-domain-bg')
                    .attr('height')).toBe(`${baseHeight}`);
            }));
        });
    });
});
describe('on vertical scroll', () => {
    let cal;
    beforeEach(() => {
        cal = new CalHeatmap();
        select('body').append('div').attr('id', 'cal-heatmap');
    });
    afterEach(() => {
        cal.destroy();
        document.getElementsByTagName('html')[0].innerHTML = '';
    });
    [0, 10].forEach((gutter) => {
        describe(`on domain gutter = ${gutter}`, () => {
            afterEach(() => {
                document.getElementsByTagName('html')[0].innerHTML = '';
            });
            it('renders the given domain gutter', () => __awaiter(void 0, void 0, void 0, function* () {
                const baseHeight = 10;
                yield cal.paint({
                    range: 2,
                    verticalOrientation: true,
                    domain: { type: 'year', gutter, label: { text: null } },
                    subDomain: { type: 'month', gutter: 0, width: 10 },
                });
                expect(select('#cal-heatmap').select('.ch-domain:nth-child(1)').attr('y')).toBe('0');
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1) .ch-domain-bg')
                    .attr('height')).toBe(`${baseHeight}`);
                expect(select('#cal-heatmap').select('.ch-domain:nth-child(2)').attr('y')).toBe(`${baseHeight + gutter}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2) .ch-domain-bg')
                    .attr('height')).toBe(`${baseHeight}`);
            }));
            it('does not affect the domain width', () => __awaiter(void 0, void 0, void 0, function* () {
                const baseWidth = 120;
                yield cal.paint({
                    range: 2,
                    verticalOrientation: true,
                    domain: { type: 'year', gutter, label: { text: null } },
                    subDomain: { type: 'month', gutter: 0, width: 10 },
                });
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1)')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(1) .ch-domain-bg')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2)')
                    .attr('width')).toBe(`${baseWidth}`);
                expect(select('#cal-heatmap')
                    .select('.ch-domain:nth-child(2) .ch-domain-bg')
                    .attr('width')).toBe(`${baseWidth}`);
            }));
        });
    });
});
