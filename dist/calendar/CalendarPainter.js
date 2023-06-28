var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CalendarPainter_instances, _CalendarPainter_getHeight, _CalendarPainter_getWidth, _CalendarPainter_resize;
import { select } from 'd3-selection';
import DomainsContainerPainter from '../domain/DomainsContainerPainter';
import PluginPainter from '../plugins/PluginPainter';
import { ScrollDirection } from '../constant';
export const DEFAULT_SELECTOR = '.ch-container';
export default class CalendarPainter {
    constructor(calendar) {
        _CalendarPainter_instances.add(this);
        this.calendar = calendar;
        this.dimensions = {
            width: 0,
            height: 0,
        };
        this.root = null;
        this.domainsContainerPainter = new DomainsContainerPainter(calendar);
        this.pluginPainter = new PluginPainter(calendar);
    }
    setup() {
        const { itemSelector, theme } = this.calendar.options.options;
        if (!this.root) {
            this.root = select(itemSelector)
                .append('svg')
                .attr('data-theme', theme)
                .attr('class', DEFAULT_SELECTOR.slice(1));
            this.domainsContainerPainter.setup();
        }
        this.calendar.pluginManager.setupAll();
        return true;
    }
    paint(navigationDir = ScrollDirection.SCROLL_NONE) {
        const transitions = this.domainsContainerPainter
            .paint(navigationDir)
            .concat(this.pluginPainter.paint())
            .concat(this.domainsContainerPainter.updatePosition());
        __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_resize).call(this);
        return Promise.allSettled(transitions);
    }
    destroy() {
        const result = this.calendar.pluginManager
            .destroyAll()
            .concat(this.domainsContainerPainter.destroy());
        if (!this.root) {
            return Promise.allSettled(result);
        }
        result.push(this.root
            .transition()
            .duration(this.calendar.options.options.animationDuration)
            .attr('width', 0)
            .attr('height', 0)
            .remove()
            .end());
        return Promise.allSettled(result);
    }
}
_CalendarPainter_instances = new WeakSet(), _CalendarPainter_getHeight = function _CalendarPainter_getHeight() {
    return (this.domainsContainerPainter.height() + this.pluginPainter.insideHeight());
}, _CalendarPainter_getWidth = function _CalendarPainter_getWidth() {
    return (this.domainsContainerPainter.width() + this.pluginPainter.insideWidth());
}, _CalendarPainter_resize = function _CalendarPainter_resize() {
    const { options } = this.calendar.options;
    const newWidth = __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_getWidth).call(this);
    const newHeight = __classPrivateFieldGet(this, _CalendarPainter_instances, "m", _CalendarPainter_getHeight).call(this);
    this.root
        .transition()
        .duration(options.animationDuration)
        .attr('width', newWidth)
        .attr('height', newHeight);
    if (newWidth !== this.dimensions.width ||
        newHeight !== this.dimensions.height) {
        this.calendar.eventEmitter.emit('resize', newWidth, newHeight, this.dimensions.width, this.dimensions.height);
    }
    this.dimensions = {
        width: newWidth,
        height: newHeight,
    };
};
