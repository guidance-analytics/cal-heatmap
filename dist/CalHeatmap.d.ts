import EventEmmiter from 'eventemitter3';
import type { PluginFunc } from 'dayjs';
import type dayjs from 'dayjs';
import Navigator from './calendar/Navigator';
import CalendarPainter from './calendar/CalendarPainter';
import Populator from './calendar/Populator';
import Options from './options/Options';
import DataFetcher from './DataFetcher';
import DomainCollection from './calendar/DomainCollection';
import DateHelper from './helpers/DateHelper';
import PluginManager from './plugins/PluginManager';
import './cal-heatmap.scss';
import TemplateCollection from './TemplateCollection';
import type { OptionsType } from './options/Options';
export type Timestamp = number;
export type DomainType = 'year' | 'month' | 'week' | 'xDay' | 'ghDay' | 'day' | 'hour' | 'minute';
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type Template = {
    (dateHelper: DateHelper, options: OptionsType): TemplateResult;
};
export type TemplateResult = {
    name: string;
    parent?: string;
    allowedDomainType: DomainType[];
    rowsCount: (ts: Timestamp) => number;
    columnsCount: (ts: Timestamp) => number;
    mapping: (startTimestamp: Timestamp, endTimestamp: Timestamp) => SubDomain[];
    extractUnit: (ts: Timestamp) => Timestamp;
};
export type SubDomain = {
    t: Timestamp;
    x: number;
    y: number;
    v?: number | string | null;
};
export type Dimensions = {
    width: number;
    height: number;
};
export interface IPlugin {
    name: string;
    calendar: CalHeatmap;
    options: PluginOptions;
    root: any;
    setup: (options?: PluginOptions) => void;
    paint: () => Promise<unknown>;
    destroy: () => Promise<unknown>;
}
export interface IPluginContructor {
    new (calendar?: CalHeatmap): IPlugin;
}
export interface PluginOptions {
    position?: 'top' | 'right' | 'bottom' | 'left';
    dimensions?: Dimensions;
    key?: string;
}
export type PluginDefinition = [IPluginContructor, Partial<PluginOptions>?];
export default class CalHeatmap {
    static VERSION: string;
    options: Options;
    calendarPainter: CalendarPainter;
    populator: Populator;
    navigator: Navigator;
    eventEmitter: EventEmmiter;
    dataFetcher: DataFetcher;
    domainCollection: DomainCollection;
    templateCollection: TemplateCollection;
    dateHelper: DateHelper;
    pluginManager: PluginManager;
    constructor();
    createDomainCollection(startDate: Timestamp | Date, range: number | Date, excludeEnd?: boolean): DomainCollection;
    /**
     * Setup and paint the calendar with the given options
     *
     * @param  {Object} options The Options object
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    paint(options?: DeepPartial<OptionsType>, plugins?: PluginDefinition[] | PluginDefinition): Promise<unknown>;
    /**
     * Add a new subDomainTemplate
     *
     * @since 4.0.0
     * @param  {SubDomainTemplate[] | SubDomainTemplate} templates
     * A single, or an array of SubDomainTemplate object
     * @return void
     */
    addTemplates(templates: Template | Template[]): void;
    /**
     * Shift the calendar by n domains forward
     *
     * @param {number} n Number of domain intervals to shift forward
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    next(n?: number): Promise<unknown>;
    /**
     * Shift the calendar by n domains backward
     *
     * @param {number} n Number of domain intervals to shift backward
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    previous(n?: number): Promise<unknown>;
    /**
     * Jump directly to a specific date
     *
     * JumpTo will scroll the calendar until the wanted domain with the specified
     * date is visible. Unless you set reset to true, the wanted domain
     * will not necessarily be the first domain of the calendar.
     *
     * @param {Date} date Jump to the domain containing that date
     * @param {boolean} reset Whether the wanted domain
     * should be the first domain of the calendar
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    jumpTo(date: Date, reset?: boolean): Promise<unknown>;
    /**
     * Fill the calendar with the given data
     *
     * @param  {Object|string}    dataSource    The calendar's datasource,
     * same type as `options.data.source`
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    fill(dataSource?: string | import("./options/Options").DataRecord[]): Promise<unknown>;
    /**
     * Listener for all events
     *
     * @since 4.0.0
     * @param  {string}  eventName  Name of the event to listen to
     * @param  {function} Callback function to execute on event trigger
     * @return void
     */
    on(name: string, fn: () => any): void;
    dimensions(): Dimensions;
    /**
     * Destroy the calendar
     *
     * @since  3.3.6
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    destroy(): Promise<unknown>;
    extendDayjs(plugin: PluginFunc): dayjs.Dayjs;
}
