var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LegendLite_instances, _LegendLite_buildLegend, _LegendLite_nodeAttrs;
import { select, create } from 'd3-selection';
import { DEFAULT_SELECTOR as MAIN_SELECTOR } from '../calendar/CalendarPainter';
import { 
// force line break from prettier
DEFAULT_SELECTOR as SUBDOMAIN_SELECTOR, } from '../subDomain/SubDomainPainter';
import { OPTIONS_DEFAULT_SUBDOMAIN_WIDTH, OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT, OPTIONS_DEFAULT_SUBDOMAIN_GUTTER, OPTIONS_DEFAULT_SUBDOMAIN_RADIUS, } from '../constant';
const DEFAULT_SELECTOR = '.ch-plugin-legend-lite';
const defaultOptions = {
    enabled: true,
    itemSelector: null,
    width: OPTIONS_DEFAULT_SUBDOMAIN_WIDTH,
    height: OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT,
    gutter: OPTIONS_DEFAULT_SUBDOMAIN_GUTTER,
    radius: OPTIONS_DEFAULT_SUBDOMAIN_RADIUS,
    includeBlank: false,
};
export default class LegendLite {
    constructor(calendar) {
        _LegendLite_instances.add(this);
        this.name = 'LegendLite';
        this.calendar = calendar;
        this.root = null;
        this.shown = false;
        this.options = defaultOptions;
    }
    setup(pluginOptions) {
        this.options = Object.assign(Object.assign({}, this.options), pluginOptions);
    }
    paint() {
        const { enabled, itemSelector } = this.options;
        if (!enabled || (itemSelector && select(itemSelector).empty())) {
            return this.destroy();
        }
        this.shown = true;
        this.root = select(itemSelector || this.calendar.options.options.itemSelector);
        if (this.root.select(DEFAULT_SELECTOR).empty()) {
            this.root = this.root
                .append('div')
                .attr('class', DEFAULT_SELECTOR.slice(1));
        }
        else {
            this.root = this.root.select(DEFAULT_SELECTOR);
        }
        const node = __classPrivateFieldGet(this, _LegendLite_instances, "m", _LegendLite_buildLegend).call(this);
        this.root.selectAll('*').remove();
        this.root.append(() => node.node());
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
_LegendLite_instances = new WeakSet(), _LegendLite_buildLegend = function _LegendLite_buildLegend() {
    var _a;
    const node = create('svg');
    const { width, height, gutter, includeBlank, } = this.options;
    const localRange = [...((_a = this.calendar.options.options.scaleDomain) !== null && _a !== void 0 ? _a : [])];
    if (includeBlank) {
        localRange.unshift(null);
    }
    node
        .attr('class', MAIN_SELECTOR.slice(1))
        .attr('width', localRange.length * width + (localRange.length - 1) * gutter)
        .attr('height', height);
    node
        .selectAll('rect')
        .data(localRange)
        .join((enter) => enter.append('rect').call((sc) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    __classPrivateFieldGet(this, _LegendLite_instances, "m", _LegendLite_nodeAttrs).call(this, sc)), (update) => update
        .selectAll('rect')
        .call((sc) => __classPrivateFieldGet(this, _LegendLite_instances, "m", _LegendLite_nodeAttrs).call(this, sc)));
    return node;
}, _LegendLite_nodeAttrs = function _LegendLite_nodeAttrs(selection) {
    const { width, height, radius, gutter, } = this.options;
    return selection
        .attr('width', width)
        .attr('height', height)
        .attr('class', `${SUBDOMAIN_SELECTOR.slice(1)}-bg`)
        .attr('rx', radius)
        .attr('ry', radius)
        .attr('x', (_d, i) => i * (width + gutter))
        .attr('y', 0)
        .call((element) => {
        element.style('fill', (d) => {
            var _a, _b, _c;
            return (d.v !== undefined && d.v !== null ?
                (_c = (_b = (_a = this.calendar.options.options).scale) === null || _b === void 0 ? void 0 : _b.call(_a, d)) !== null && _c !== void 0 ? _c : null :
                null);
        });
    });
};
