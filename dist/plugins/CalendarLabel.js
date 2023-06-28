var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CalendarLabel_instances, _CalendarLabel_buildComputedOptions, _CalendarLabel_computeDimensions, _CalendarLabel_setRectAttr, _CalendarLabel_setTextAttr, _CalendarLabel_getTextXOffset, _CalendarLabel_getX, _CalendarLabel_getY;
import { Position } from '../constant';
import { isHorizontal, isVertical, horizontalPadding, verticalPadding, } from '../helpers/PositionHelper';
const DEFAULT_SELECTOR = '.ch-plugin-calendar-label';
const defaultOptions = {
    enabled: true,
    dimensions: {
        width: 0,
        height: 0,
    },
    position: 'left',
    text: () => [],
    padding: [0, 0, 0, 0],
};
export default class CalendarLabel {
    constructor(calendar) {
        var _a, _b;
        _CalendarLabel_instances.add(this);
        this.name = 'CalendarLabel';
        const subDomain = (_b = (_a = calendar === null || calendar === void 0 ? void 0 : calendar.options) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.subDomain;
        this.calendar = calendar;
        this.root = null;
        this.shown = false;
        this.options = defaultOptions;
        this.computedOptions = {
            radius: subDomain === null || subDomain === void 0 ? void 0 : subDomain.radius,
            width: subDomain === null || subDomain === void 0 ? void 0 : subDomain.width,
            height: subDomain === null || subDomain === void 0 ? void 0 : subDomain.height,
            gutter: subDomain === null || subDomain === void 0 ? void 0 : subDomain.gutter,
            textAlign: 'start',
        };
    }
    setup(pluginOptions) {
        this.options = Object.assign(Object.assign({}, defaultOptions), pluginOptions);
    }
    paint() {
        const { enabled } = this.options;
        if (!enabled) {
            return this.destroy();
        }
        this.shown = true;
        const calendarRoot = this.calendar.calendarPainter.root;
        if (!this.root) {
            this.root = calendarRoot
                .append('svg')
                .attr('class', DEFAULT_SELECTOR.slice(1))
                .attr('data-key', this.options.key)
                .attr('x', 0)
                .attr('y', 0);
        }
        this.build();
        return Promise.resolve();
    }
    destroy() {
        if (this.root !== null) {
            this.root.remove();
            this.root = null;
        }
        return Promise.resolve();
    }
    build() {
        __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_buildComputedOptions).call(this);
        __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_computeDimensions).call(this);
        this.root
            .selectAll('g')
            .data(this.options.text)
            .join((enter) => enter
            .append('g')
            .call((selection) => selection
            .append('rect')
            .attr('class', `${DEFAULT_SELECTOR.slice(1)}-bg`)
            .attr('style', 'fill: transparent')
            .call((s) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_setRectAttr).call(this, s)))
            .call((selection) => selection
            .append('text')
            .attr('class', `${DEFAULT_SELECTOR.slice(1)}-text`)
            .attr('dominant-baseline', 'central')
            .attr('text-anchor', 'middle')
            .attr('style', 'fill: currentColor; font-size: 10px')
            .call((s) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_setTextAttr).call(this, s))));
        return Promise.resolve();
    }
}
_CalendarLabel_instances = new WeakSet(), _CalendarLabel_buildComputedOptions = function _CalendarLabel_buildComputedOptions() {
    Object.keys(this.computedOptions).forEach((key) => {
        if (typeof this.options[key] !== 'undefined') {
            // @ts-ignore
            this.computedOptions[key] = this.options[key];
        }
    });
}, _CalendarLabel_computeDimensions = function _CalendarLabel_computeDimensions() {
    const { width, height, gutter } = this.computedOptions;
    const { text, padding, position } = this.options;
    const labelsCount = text().length;
    this.options.dimensions = {
        width: width + horizontalPadding(padding),
        height: height + verticalPadding(padding),
    };
    if (isVertical(position)) {
        this.options.dimensions.width += (width + gutter) * (labelsCount - 1);
    }
    else {
        this.options.dimensions.height += (height + gutter) * (labelsCount - 1);
    }
}, _CalendarLabel_setRectAttr = function _CalendarLabel_setRectAttr(selection) {
    const { width, height, radius } = this.computedOptions;
    selection
        .attr('width', width)
        .attr('height', height)
        .attr('rx', radius && radius > 0 ? radius : null)
        .attr('ry', radius && radius > 0 ? radius : null)
        .attr('x', (_d, i) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_getX).call(this, i))
        .attr('y', (_d, i) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_getY).call(this, i));
}, _CalendarLabel_setTextAttr = function _CalendarLabel_setTextAttr(selection) {
    const { height, textAlign } = this.computedOptions;
    selection
        .attr('text-anchor', textAlign)
        .attr('x', (_d, i) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_getTextXOffset).call(this) + __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_getX).call(this, i))
        .attr('y', (_d, i) => __classPrivateFieldGet(this, _CalendarLabel_instances, "m", _CalendarLabel_getY).call(this, i) + height / 2)
        .text((data) => data);
}, _CalendarLabel_getTextXOffset = function _CalendarLabel_getTextXOffset() {
    const { width, textAlign } = this.computedOptions;
    switch (textAlign) {
        case 'start':
            return 0;
        case 'middle':
            return width / 2;
        case 'end':
            return width;
        default:
            return 0;
    }
}, _CalendarLabel_getX = function _CalendarLabel_getX(index) {
    const { position, padding } = this.options;
    const { width, gutter } = this.computedOptions;
    if (isHorizontal(position)) {
        return padding[Position.LEFT];
    }
    return padding[Position.LEFT] + (width + gutter) * index;
}, _CalendarLabel_getY = function _CalendarLabel_getY(index) {
    const { position, padding } = this.options;
    const { height, gutter } = this.computedOptions;
    if (isVertical(position)) {
        return padding[Position.TOP];
    }
    return padding[Position.TOP] + (height + gutter) * index;
};
