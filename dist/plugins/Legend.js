import { select } from 'd3-selection';
import { legend } from '@observablehq/plot';
const DEFAULT_SELECTOR = '#ch-plugin-legend';
const defaultOptions = {
    // Whether to display the legend
    enabled: true,
    itemSelector: null,
    label: null,
    width: 130,
};
export default class Legend {
    constructor(calendar) {
        this.name = 'Legend';
        this.calendar = calendar;
        this.root = null;
        this.shown = false;
        this.options = defaultOptions;
    }
    setup(pluginOptions) {
        this.options = Object.assign(Object.assign({}, defaultOptions), pluginOptions);
    }
    paint() {
        const scaleOptions = this.calendar.options.options.scale;
        const { enabled, itemSelector } = this.options;
        if (!enabled || (itemSelector && select(itemSelector).empty())) {
            return this.destroy();
        }
        this.shown = true;
        this.root = select(itemSelector || this.calendar.options.options.itemSelector);
        if (this.root.select(DEFAULT_SELECTOR).empty()) {
            this.root = this.root.append('div').attr('id', DEFAULT_SELECTOR.slice(1));
        }
        else {
            this.root = this.root.select(DEFAULT_SELECTOR);
        }
        // @ts-ignore
        const node = legend(Object.assign(Object.assign({}, scaleOptions), this.options));
        this.root.selectAll('*').remove();
        this.root.append(() => node);
        return Promise.resolve();
    }
    destroy() {
        if (this.root !== null) {
            this.root.remove();
            this.root = null;
        }
        return Promise.resolve();
    }
}
