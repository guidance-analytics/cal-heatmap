import TemplateCollection from '../src/TemplateCollection';
import DateHelper from '../src/helpers/DateHelper';
import Options from '../src/options/Options';
describe('TemplateCollection', () => {
    let t;
    const template = { name: 'test_day' };
    const options = new Options();
    beforeEach(() => {
        t = new TemplateCollection(new DateHelper(), options);
        t.settings.set('test_day', template);
    });
    it('returns the settings from the specified domain', () => {
        expect(t.get('test_day')).toEqual(template);
        expect(t.get('nonexisting')).toEqual(undefined);
    });
    it('returns true if the specified domain exist', () => {
        expect(t.has('test_day')).toBe(true);
    });
    it('returns false if the specified domain does not exist', () => {
        expect(t.has('nonexisting')).toBe(false);
    });
    it('can init with the default templates', () => {
        expect(t.has('day')).toBe(false);
        t.init();
        expect(t.has('day')).toBe(true);
    });
    it('init() the default templates before adding custom', () => {
        expect(t.initiated).toBe(false);
        t.add(() => ({ name: 'custom' }));
        expect(t.initiated).toBe(true);
    });
    it('can add a single template', () => {
        const name = 'test_year';
        expect(t.has(name)).toBe(false);
        t.add(() => ({ name }));
        expect(t.has(name)).toBe(true);
    });
    it('can add an array of templates', () => {
        const name = 'test_year';
        const nameB = 'test_year2';
        expect(Array.from(t.settings.entries())).toEqual([['test_day', template]]);
        t.add([
            () => ({ name }),
            () => ({ name: nameB }),
        ]);
        expect(t.has('test_day')).toBe(true);
        expect(t.has('test_year')).toBe(true);
        expect(t.has('test_year2')).toBe(true);
    });
    it('keeps the existing templates', () => {
        const name = 'test_year';
        const nameB = 'test_year2';
        t.init();
        const count = t.settings.size;
        t.add([
            () => ({ name }),
            () => ({ name: nameB }),
        ]);
        expect(t.settings.size).toBe(count + 2);
    });
    it('can init templates with default template as parent', () => {
        const name = 'quarter';
        t.init();
        t.add(() => ({
            name,
            parent: 'year',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            columnsCount: (_ts) => 50,
        }));
        expect(t.get(name).rowsCount(0)).toBe(t.get('year').rowsCount(0));
        expect(t.get(name).columnsCount(0)).toBe(50);
        expect(t.get(name)).toHaveProperty('rowsCount');
        expect(t.get(name)).toHaveProperty('mapping');
    });
    it('can init templates with custom template as parent', () => {
        t.add([
            () => ({
                name: 'children',
                parent: 'parent',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                columnsCount: (_ts) => 10,
            }),
            () => ({
                name: 'parent',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                columnsCount: (_ts) => 50,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                rowsCount: (_ts) => 11,
            }),
        ]);
        expect(t.get('children').columnsCount(0)).toBe(10);
        expect(t.get('children').rowsCount(0)).toBe(11);
        expect(t.get('parent').columnsCount(0)).toBe(50);
    });
});
