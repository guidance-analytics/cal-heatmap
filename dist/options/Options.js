import mergeWith from 'lodash-es/mergeWith';
import isEqual from 'lodash-es/isEqual';
import has from 'lodash-es/has';
import get from 'lodash-es/get';
import set from 'lodash-es/set';
import { OPTIONS_DEFAULT_DOMAIN_TYPE, OPTIONS_DEFAULT_SUBDOMAIN_TYPE, OPTIONS_DEFAULT_SUBDOMAIN_WIDTH, OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT, OPTIONS_DEFAULT_SUBDOMAIN_GUTTER, OPTIONS_DEFAULT_SUBDOMAIN_RADIUS, OPTIONS_DEFAULT_THEME, OPTIONS_DEFAULT_ANIMATION_DURATION, OPTIONS_DEFAULT_ITEM_SELECTOR, OPTIONS_DEFAULT_RANGE, OPTIONS_DEFAULT_LOCALE, } from '../constant';
import OptionsPreProcessors from './OptionsPreProcessors';
export default class Options {
    constructor(processors = OptionsPreProcessors) {
        this.preProcessors = processors;
        this.options = {
            // selector string of the container to append the graph to
            // Accept any string value accepted by document.querySelector or CSS3
            // or an Element object
            itemSelector: OPTIONS_DEFAULT_ITEM_SELECTOR,
            // Number of domain to display on the graph
            range: OPTIONS_DEFAULT_RANGE,
            domain: {
                type: OPTIONS_DEFAULT_DOMAIN_TYPE,
                // Space between each domain, in pixel
                gutter: 4,
                padding: [0, 0, 0, 0],
                // Whether to enable dynamic domain size
                // The width/height on a domain depends on the number of
                // subDomains items count
                dynamicDimension: true,
                // Whether to show most recent date first
                sort: 'asc',
                label: {
                    // Formatting of the domain label
                    // @default: undefined, will use the formatting
                    // according to domain type
                    // Accept any string accepted by dayjs.format()
                    // or a function
                    //
                    // Refer to https://day.js.org/docs/en/display/format
                    // for list of accepted string tokens used by dayjs.format()
                    text: undefined,
                    // valid: top, right, bottom, left
                    position: 'bottom',
                    // Valid are the direct svg values: start, middle, end
                    textAlign: 'middle',
                    // By default, there is no margin/padding around the label
                    offset: {
                        x: 0,
                        y: 0,
                    },
                    rotate: null,
                    // Used only on vertical orientation
                    width: 100,
                    // Used only on horizontal orientation
                    height: 25,
                },
            },
            subDomain: {
                type: OPTIONS_DEFAULT_SUBDOMAIN_TYPE,
                // Width of each subDomain cell, in pixel
                width: OPTIONS_DEFAULT_SUBDOMAIN_WIDTH,
                // Height of each subDomain cell, in pixel
                height: OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT,
                // Space between each subDomain cell, in pixel
                gutter: OPTIONS_DEFAULT_SUBDOMAIN_GUTTER,
                // Radius of each subDomain cell, in pixel
                radius: OPTIONS_DEFAULT_SUBDOMAIN_RADIUS,
                // Formatting of the text inside each subDomain cell
                // @default: null, no text
                // Accept any string accepted by dayjs.format()
                // or a function
                //
                // Refer to https://day.js.org/docs/en/display/format
                // for list of accepted string tokens used by dayjs.format()
                label: null,
                color: undefined,
                sort: 'asc',
            },
            date: {
                // Start date of the graph
                // @default now
                start: new Date(),
                min: undefined,
                max: undefined,
                // List of dates to highlight
                // Valid values:
                // - []: don't highlight anything
                // - an array of Date objects: highlight the specified dates
                highlight: [],
                locale: OPTIONS_DEFAULT_LOCALE,
                timezone: undefined,
            },
            // Calendar orientation
            // false: display domains side by side
            // true : display domains one under the other
            verticalOrientation: false,
            data: {
                // Data source
                // URL, where to fetch the original datas
                source: '',
                // Data type
                // Default: json
                type: 'json',
                requestInit: {},
                // keyname of the time property
                x: '',
                // keyname of the value property
                y: '',
                // Grouping function of the values
                groupY: 'sum',
                defaultValue: null,
            },
            scale: undefined,
            scaleDomain: [],
            // Animation duration, in ms
            animationDuration: OPTIONS_DEFAULT_ANIMATION_DURATION,
            // Theme mode: dark/light
            theme: OPTIONS_DEFAULT_THEME,
            // Internally used options, do not edit not set
            x: {
                domainHorizontalLabelWidth: 0,
                domainVerticalLabelHeight: 0,
            },
        };
    }
    /**
     * Set a new value for an option, only if unchanged
     * @param {string} key   Name of the option
     * @param {any} value Value of the option
     * @return {boolean} Whether the option have been changed
     */
    set(key, value) {
        if (!has(this.options, key) || isEqual(get(this.options, key), value)) {
            return false;
        }
        set(this.options, key, has(this.preProcessors, key) ?
            get(this.preProcessors, key)(value) :
            value);
        return true;
    }
    init(opts) {
        this.options = Object.assign({}, mergeWith(this.options, opts, (_, srcValue) => {
            return Array.isArray(srcValue) ? srcValue : undefined;
        }));
        const { options } = this;
        Object.keys(this.preProcessors).forEach((key) => {
            set(options, key, get(this.preProcessors, key)(get(options, key)));
        });
        options.x.domainVerticalLabelHeight = options.domain.label.height;
        // When the label is affecting the height
        if (options.domain.label.position === 'top' ||
            options.domain.label.position === 'bottom') {
            options.x.domainHorizontalLabelWidth = 0;
        }
        else {
            options.x.domainVerticalLabelHeight = 0;
            options.x.domainHorizontalLabelWidth = options.domain.label.width;
        }
        if (options.domain.label.text === null ||
            options.domain.label.text === '') {
            options.x.domainVerticalLabelHeight = 0;
            options.x.domainHorizontalLabelWidth = 0;
        }
    }
}
