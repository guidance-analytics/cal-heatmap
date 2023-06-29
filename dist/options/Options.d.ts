import type { Ls } from 'dayjs';
import type { DomainType, Timestamp, DeepPartial } from '../CalHeatmap';
type SortOrder = 'asc' | 'desc';
export type TextAlign = 'start' | 'middle' | 'end';
export type Padding = [number, number, number, number];
export type DomainOptions = {
    type: DomainType;
    gutter: number;
    padding: Padding;
    dynamicDimension: boolean;
    label: LabelOptions;
    sort: SortOrder;
};
type LabelOptions = {
    text?: string | null | ((timestamp: Timestamp, element: SVGElement) => string);
    position: 'top' | 'right' | 'bottom' | 'left';
    textAlign: TextAlign;
    offset: {
        x: number;
        y: number;
    };
    rotate: null | 'left' | 'right';
    width: number;
    height: number;
};
export type SubDomainOptions = {
    type: string;
    width: number;
    height: number;
    gutter: number;
    radius: number;
    label: string | null | ((timestamp: Timestamp, value: number, element: SVGElement) => string);
    color?: string | ((timestamp: Timestamp, value: number | string | null | undefined, backgroundColor: string) => string);
    sort: SortOrder;
};
export type DataGroupType = 'sum' | 'count' | 'min' | 'max' | 'average';
type DateOptions = {
    start: Date;
    min?: Date;
    max?: Date;
    highlight: Date[];
    locale: string | Partial<(typeof Ls)[0]>;
    timezone?: string;
};
export type DataRecord = Record<string, string | number>;
export type DataOptions = {
    source: string | DataRecord[];
    type: 'json' | 'csv' | 'tsv' | 'txt';
    requestInit: object;
    x: string | ((datum: DataRecord) => number);
    y: string | ((datum: DataRecord) => number);
    groupY: DataGroupType | ((values: (string | number | null)[]) => string | number | null);
    defaultValue: null | number | string;
};
export type OptionsType = {
    itemSelector: string;
    range: number;
    domain: DomainOptions;
    subDomain: SubDomainOptions;
    date: DateOptions;
    data: DataOptions;
    scale?: (input: number) => string;
    scaleDomain?: number[];
    animationDuration: number;
    verticalOrientation: boolean;
    theme: 'light' | 'dark';
};
type InternalOptionsType = {
    x: {
        domainHorizontalLabelWidth: number;
        domainVerticalLabelHeight: number;
    };
};
export default class Options {
    options: OptionsType & InternalOptionsType;
    preProcessors: {
        [key: string]: (value: any) => any;
    };
    constructor(processors?: {
        range: (value: number) => number;
        'date.highlight': (args: Date | Date[]) => Date[];
        'subDomain.label': (value: string | ((timestamp: number, value: number, element: SVGElement) => string) | null) => string | Function | null;
    });
    /**
     * Set a new value for an option, only if unchanged
     * @param {string} key   Name of the option
     * @param {any} value Value of the option
     * @return {boolean} Whether the option have been changed
     */
    set(key: string, value: any): boolean;
    init(opts?: DeepPartial<OptionsType>): void;
}
export {};
