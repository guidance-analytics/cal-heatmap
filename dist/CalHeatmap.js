var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmmiter from 'eventemitter3';
import castArray from 'lodash-es/castArray';
import Navigator from './calendar/Navigator';
import CalendarPainter from './calendar/CalendarPainter';
import Populator from './calendar/Populator';
import Options from './options/Options';
import DataFetcher from './DataFetcher';
import DomainCollection from './calendar/DomainCollection';
import DateHelper from './helpers/DateHelper';
import validate from './options/OptionsValidator';
import PluginManager from './plugins/PluginManager';
import VERSION from './version';
import TemplateCollection from './TemplateCollection';
import { ScrollDirection } from './constant';
class CalHeatmap {
    constructor() {
        // Default options
        this.options = new Options();
        // Init the helpers with the default options
        this.dateHelper = new DateHelper();
        this.templateCollection = new TemplateCollection(this.dateHelper, this.options);
        this.dataFetcher = new DataFetcher(this);
        this.navigator = new Navigator(this);
        this.populator = new Populator(this);
        this.calendarPainter = new CalendarPainter(this);
        this.eventEmitter = new EventEmmiter();
        this.pluginManager = new PluginManager(this);
    }
    createDomainCollection(startDate, range, excludeEnd = true) {
        return new DomainCollection(this.dateHelper, this.options.options.domain.type, startDate, range, excludeEnd);
    }
    // =========================================================================
    // PUBLIC API
    // =========================================================================
    /**
     * Setup and paint the calendar with the given options
     *
     * @param  {Object} options The Options object
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    paint(options, plugins) {
        return __awaiter(this, void 0, void 0, function* () {
            this.options.init(options);
            yield this.dateHelper.setup(this.options);
            this.templateCollection.init();
            try {
                validate(this.templateCollection, this.options.options);
            }
            catch (error) {
                return Promise.reject(error);
            }
            if (plugins) {
                this.pluginManager.add(castArray(plugins));
            }
            this.calendarPainter.setup();
            // Record all the valid domains
            // Each domain value is a timestamp in milliseconds
            this.domainCollection = new DomainCollection(this.dateHelper);
            this.navigator.loadNewDomains(this.createDomainCollection(this.options.options.date.start, this.options.options.range));
            return Promise.allSettled([this.calendarPainter.paint(), this.fill()]);
        });
    }
    /**
     * Add a new subDomainTemplate
     *
     * @since 4.0.0
     * @param  {SubDomainTemplate[] | SubDomainTemplate} templates
     * A single, or an array of SubDomainTemplate object
     * @return void
     */
    addTemplates(templates) {
        this.templateCollection.add(templates);
    }
    /**
     * Shift the calendar by n domains forward
     *
     * @param {number} n Number of domain intervals to shift forward
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    next(n = 1) {
        const loadDirection = this.navigator.loadNewDomains(this.createDomainCollection(this.domainCollection.max, n + 1).slice(n), ScrollDirection.SCROLL_FORWARD);
        return Promise.allSettled([
            this.calendarPainter.paint(loadDirection),
            this.fill(),
        ]);
    }
    /**
     * Shift the calendar by n domains backward
     *
     * @param {number} n Number of domain intervals to shift backward
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    previous(n = 1) {
        const loadDirection = this.navigator.loadNewDomains(this.createDomainCollection(this.domainCollection.min, -n), ScrollDirection.SCROLL_BACKWARD);
        return Promise.allSettled([
            this.calendarPainter.paint(loadDirection),
            this.fill(),
        ]);
    }
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
    jumpTo(date, reset = false) {
        return Promise.allSettled([
            this.calendarPainter.paint(this.navigator.jumpTo(date, reset)),
            this.fill(),
        ]);
    }
    /**
     * Fill the calendar with the given data
     *
     * @param  {Object|string}    dataSource    The calendar's datasource,
     * same type as `options.data.source`
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    fill(dataSource = this.options.options.data.source) {
        const { options } = this.options;
        const template = this.templateCollection;
        const endDate = this.dateHelper.intervals(options.domain.type, this.domainCollection.max, 2)[1];
        const dataPromise = this.dataFetcher.getDatas(dataSource, this.domainCollection.min, endDate);
        return new Promise((resolve, reject) => {
            dataPromise.then((data) => {
                this.domainCollection.fill(data, options.data, template.get(options.subDomain.type).extractUnit);
                this.populator.populate();
                resolve(null);
            }, (error) => {
                reject(error);
            });
        });
    }
    /**
     * Listener for all events
     *
     * @since 4.0.0
     * @param  {string}  eventName  Name of the event to listen to
     * @param  {function} Callback function to execute on event trigger
     * @return void
     */
    on(name, fn) {
        this.eventEmitter.on(name, fn);
    }
    dimensions() {
        return this.calendarPainter.dimensions;
    }
    /**
     * Destroy the calendar
     *
     * @since  3.3.6
     * @return A Promise, which will fulfill once all the underlying asynchronous
     * tasks settle, whether resolved or rejected.
     */
    destroy() {
        return this.calendarPainter.destroy();
    }
    extendDayjs(plugin) {
        return this.dateHelper.extend(plugin);
    }
}
CalHeatmap.VERSION = VERSION;
export default CalHeatmap;
