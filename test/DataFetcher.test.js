var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DataFetcher from '../src/DataFetcher';
import Options from '../src/options/Options';
import CalHeatmap from '../src/CalHeatmap';
describe('DataFetcher', () => {
    const calendar = new CalHeatmap();
    describe('getDatas()', () => {
        it.todo('fetch the data from a remote source when string');
        it('returns the data itself when a JSON object', () => __awaiter(void 0, void 0, void 0, function* () {
            const fetcher = new DataFetcher(calendar);
            const data = [{ time: 1, value: 0 }];
            yield expect(fetcher.getDatas(data, 0, 0)).resolves.toBe(data);
        }));
        it('returns an empty object when source is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = new Options();
            // @ts-ignore
            options.init({ data: { type: 'test', source: 'test' } });
            const fetcher = new DataFetcher(calendar);
            yield expect(fetcher.getDatas('', 0, 0)).resolves.toStrictEqual([]);
        }));
        it.todo('interpolates the url with the dates');
    });
    describe('parseURI()', () => {
        let fetcher;
        beforeEach(() => {
            fetcher = new DataFetcher(calendar);
        });
        it('replaces the start token by a formatted date', () => {
            expect(fetcher.parseURI('https://test.com/api?start={{start=[year]%20YYYY}}', +new Date('2020-01-01'), +new Date('2020-12-31'))).toBe('https://test.com/api?start=year%202020');
        });
        it('replaces the end token by a formatted date', () => {
            expect(fetcher.parseURI('https://test.com/api?start={{end=x}}', +new Date('2020-01-01'), +new Date('2020-12-31'))).toBe(`https://test.com/api?start=${+new Date('2020-12-31')}`);
        });
    });
});
