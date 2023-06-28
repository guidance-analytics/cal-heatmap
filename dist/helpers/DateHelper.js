var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekday from 'dayjs/plugin/weekday';
import minMax from 'dayjs/plugin/minMax';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(dayOfYear);
dayjs.extend(weekday);
dayjs.extend(minMax);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
const DEFAULT_LOCALE = 'en';
export default class DateHelper {
    constructor() {
        var _a;
        this.locale = DEFAULT_LOCALE;
        this.timezone = dayjs.tz.guess();
        if (typeof window === 'object') {
            (_a = window).dayjs || (_a.dayjs = dayjs);
        }
    }
    setup({ options }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timezone = options.date.timezone || dayjs.tz.guess();
            const userLocale = options.date.locale;
            if (typeof userLocale === 'string' && userLocale !== DEFAULT_LOCALE) {
                let locale;
                if (typeof window === 'object') {
                    locale =
                        window[`dayjs_locale_${userLocale}`] ||
                            (yield this.loadBrowserLocale(userLocale));
                }
                else {
                    locale = yield this.loadNodeLocale(userLocale);
                }
                dayjs.locale(userLocale);
                this.locale = locale;
            }
            if (typeof userLocale === 'object') {
                if (userLocale.hasOwnProperty('name')) {
                    dayjs.locale(userLocale.name, userLocale);
                    this.locale = userLocale;
                }
                else {
                    this.locale = dayjs.updateLocale(DEFAULT_LOCALE, userLocale);
                }
            }
        });
    }
    // eslint-disable-next-line class-methods-use-this
    extend(dayjsPlugin) {
        return dayjs.extend(dayjsPlugin);
    }
    /**
     * Return the week number, relative to its month
     *
     * @param  {number|Date} d Date or timestamp in milliseconds
     * @returns {number} The week number, relative to the month [0-5]
     */
    getMonthWeekNumber(d) {
        const dayjsDate = this.date(d);
        const date = dayjsDate.startOf('day');
        const endOfWeek = dayjsDate.startOf('month').endOf('week');
        if (date <= endOfWeek) {
            return 1;
        }
        return Math.ceil(date.diff(endOfWeek, 'weeks', true)) + 1;
    }
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
    getWeeksCountInMonth(d) {
        const pivotDate = this.date(d);
        return (this.getLastWeekOfMonth(pivotDate).diff(this.getFirstWeekOfMonth(pivotDate), 'week') + 1);
    }
    /**
     * Return the start of the first week of the month
     *
     * @see getWeeksCountInMonth() about standard warning
     * @return {dayjs.Dayjs} A dayjs object representing the start of the
     * first week
     */
    getFirstWeekOfMonth(d) {
        const startOfMonth = this.date(d).startOf('month');
        let startOfFirstWeek = startOfMonth.startOf('week');
        if (startOfMonth.weekday() > 4) {
            startOfFirstWeek = startOfFirstWeek.add(1, 'week');
        }
        return startOfFirstWeek;
    }
    /**
     * Return the end of the last week of the month
     *
     * @see getWeeksCountInMonth() about standard warning
     * @return {dayjs.Dayjs} A dayjs object representing the end of the last week
     */
    getLastWeekOfMonth(d) {
        const endOfMonth = this.date(d).endOf('month');
        let endOfLastWeek = endOfMonth.endOf('week');
        if (endOfMonth.weekday() < 4) {
            endOfLastWeek = endOfLastWeek.subtract(1, 'week');
        }
        return endOfLastWeek;
    }
    date(d = new Date()) {
        if (dayjs.isDayjs(d)) {
            return d;
        }
        return dayjs(d)
            .tz(this.timezone)
            .utcOffset(0)
            .locale(this.locale);
    }
    format(timestamp, formatter, ...args) {
        if (typeof formatter === 'function') {
            return formatter(timestamp, ...args);
        }
        if (typeof formatter === 'string') {
            return this.date(timestamp).format(formatter);
        }
        return null;
    }
    /**
     * Return an array of time interval
     *
     * @param  {number|Date} date A random date included in the wanted interval
     * @param  {number|Date} range Length of the wanted interval, or a stop date.
     * @param  {boolean} range Whether the end date should be excluded
     *                         from the result
     * @returns {Array<number>} Array of unix timestamp, in milliseconds
     */
    intervals(interval, date, range, excludeEnd = true) {
        let start = this.date(date);
        let end;
        if (typeof range === 'number') {
            end = start.add(range, interval);
        }
        else if (dayjs.isDayjs(range)) {
            end = range;
        }
        else {
            end = this.date(range);
        }
        start = start.startOf(interval);
        end = end.startOf(interval);
        let pivot = dayjs.min(start, end);
        end = dayjs.max(start, end);
        const result = [];
        if (!excludeEnd) {
            end = end.add(1, 'second');
        }
        do {
            result.push(+pivot);
            pivot = pivot.add(1, interval);
        } while (pivot < end);
        return result;
    }
    // this function will work cross-browser for loading scripts asynchronously
    // eslint-disable-next-line class-methods-use-this
    loadBrowserLocale(userLocale) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = `https://cdn.jsdelivr.net/npm/dayjs@1/locale/${userLocale}.js`;
            s.onerror = (err) => {
                reject(err);
            };
            s.onload = () => {
                resolve(window[`dayjs_locale_${userLocale}`]);
            };
            document.head.appendChild(s);
        });
    }
    // eslint-disable-next-line class-methods-use-this
    loadNodeLocale(userLocale) {
        return import(`dayjs/locale/${userLocale}.js`);
    }
}
