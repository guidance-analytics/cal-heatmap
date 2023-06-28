import type DateHelper from '../../src/helpers/DateHelper';
declare const quarterTemplate: (DateHelper: DateHelper) => {
    name: string;
    allowedDomainType: string[];
    rowsCount(): number;
    columnsCount(): number;
    mapping: (startDate: number, endDate: number, defaultValues?: any) => any[];
    extractUnit(ts: number): number;
};
export default quarterTemplate;
