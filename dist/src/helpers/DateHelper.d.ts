import dayjs from 'dayjs';
import type { PluginFunc } from 'dayjs';
import type { OptionsType } from '../options/Options';
import type { Timestamp, DomainType } from '../index';
export default class DateHelper {
    locale: OptionsType['date']['locale'];
    timezone: string;
    constructor();
    setup({ options }: {
        options: OptionsType;
    }): Promise<void>;
    extend(dayjsPlugin: PluginFunc): dayjs.Dayjs;
    /**
     * Return the week number, relative to its month
     *
     * @param  {number|Date} d Date or timestamp in milliseconds
     * @returns {number} The week number, relative to the month [0-5]
     */
    getMonthWeekNumber(d: Timestamp | dayjs.Dayjs): number;
    /**
     * Return the number of weeks in the given month
     *
     * As there is no fixed standard to specify which month a partial week should
     * belongs to, the ISO week date standard is used, where:
     * - the first week of the month should have at least 4 days
     *
     *  @see https://en.wikipedia.org/wiki/ISO_week_date
     *
     * @param  {Timestamp | dayjs.Dayjs} d Datejs object or timestamp
     * @return {number}         The number of weeks
     */
    getWeeksCountInMonth(d: Timestamp | dayjs.Dayjs): number;
    /**
     * Return the start of the first week of the month
     *
     * @see getWeeksCountInMonth() about standard warning
     * @return {dayjs.Dayjs} A dayjs object representing the start of the
     * first week
     */
    getFirstWeekOfMonth(d: Timestamp | dayjs.Dayjs): dayjs.Dayjs;
    /**
     * Return the end of the last week of the month
     *
     * @see getWeeksCountInMonth() about standard warning
     * @return {dayjs.Dayjs} A dayjs object representing the end of the last week
     */
    getLastWeekOfMonth(d: Timestamp | dayjs.Dayjs): dayjs.Dayjs;
    date(d?: Timestamp | Date | dayjs.Dayjs | string): dayjs.Dayjs;
    format(timestamp: Timestamp, formatter: null | string | Function, ...args: any): string | null;
    /**
     * Return an array of time interval
     *
     * @param  {number|Date} date A random date included in the wanted interval
     * @param  {number|Date} range Length of the wanted interval, or a stop date.
     * @param  {boolean} range Whether the end date should be excluded
     *                         from the result
     * @returns {Array<number>} Array of unix timestamp, in milliseconds
     */
    intervals(interval: DomainType, date: Timestamp | Date | dayjs.Dayjs, range: number | Date | dayjs.Dayjs, excludeEnd?: boolean): Timestamp[];
    loadBrowserLocale(userLocale: string): Promise<any>;
    loadNodeLocale(userLocale: string): Promise<any>;
}
