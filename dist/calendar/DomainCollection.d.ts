import type { SubDomain } from '../CalHeatmap';
import type { DataOptions, DataGroupType, DataRecord } from '../options/Options';
import { DomainType, Timestamp } from '../CalHeatmap';
import type DateHelper from '../helpers/DateHelper';
export declare const DOMAIN_FORMAT: Record<DomainType, string>;
type GroupedRecords = Map<Timestamp, {
    [key: Timestamp]: DataRecord[];
}>;
type ValueType = string | number | null;
export default class DomainCollection {
    #private;
    collection: Map<Timestamp, SubDomain[]>;
    dateHelper: DateHelper;
    min: Timestamp;
    max: Timestamp;
    keys: Timestamp[];
    yankedDomains: Timestamp[];
    constructor(dateHelper: DateHelper, interval?: DomainType, start?: Date | Timestamp, range?: Date | Timestamp, excludeEnd?: boolean);
    has(key: Timestamp): boolean;
    get(key: Timestamp): SubDomain[] | undefined;
    forEach(callback: any): void;
    at(index: number): Timestamp;
    clamp(minDate?: Timestamp, maxDate?: Timestamp): DomainCollection;
    merge(newCollection: DomainCollection, limit: number, createValueCallback: Function): void;
    slice(limit?: number, fromBeginning?: boolean): DomainCollection;
    fill(data: DataRecord[], { x, y, groupY, defaultValue, }: {
        x: DataOptions['x'];
        y: DataOptions['y'];
        groupY: DataOptions['groupY'];
        defaultValue: DataOptions['defaultValue'];
    }, subDomainKeyExtractor: Function): void;
    groupRecords(data: DataRecord[], x: DataOptions['x'], subDomainKeyExtractor: Function): GroupedRecords;
    groupValues(values: ValueType[], groupFn: DataGroupType | ((values: ValueType[]) => ValueType)): ValueType;
    extractTimestamp(datum: DataRecord, x: string | Function, extractorFn: Function): Timestamp;
}
export {};
