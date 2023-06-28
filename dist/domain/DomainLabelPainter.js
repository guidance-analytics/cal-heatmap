var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomainLabelPainter_instances, _DomainLabelPainter_textVerticalAlign, _DomainLabelPainter_getX, _DomainLabelPainter_getY, _DomainLabelPainter_getDomainInsideWidth, _DomainLabelPainter_getDomainInsideHeight, _DomainLabelPainter_domainRotate;
import { Position } from '../constant';
import { isVertical, verticalPadding, horizontalPadding, } from '../helpers/PositionHelper';
import { DOMAIN_FORMAT } from '../calendar/DomainCollection';
const DEFAULT_SELECTOR = '.ch-domain-text';
export default class DomainLabelPainter {
    constructor(calendar) {
        _DomainLabelPainter_instances.add(this);
        this.calendar = calendar;
    }
    paint(root) {
        const { label, type } = this.calendar.options.options.domain;
        const { dateHelper } = this.calendar;
        let format = label.text;
        if (format === null || format === '') {
            return;
        }
        if (typeof format === 'undefined') {
            format = DOMAIN_FORMAT[type];
        }
        root
            .selectAll(DEFAULT_SELECTOR)
            .data((d) => [d], (d) => d)
            .join((enter) => enter
            .append('text')
            .attr('class', DEFAULT_SELECTOR.slice(1))
            .attr('x', (d) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getX).call(this, d))
            .attr('y', (d) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getY).call(this, d))
            .attr('text-anchor', label.textAlign)
            .attr('dominant-baseline', () => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_textVerticalAlign).call(this))
            .text((d, i, nodes) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        dateHelper.format(d, format, nodes[i]))
            .call((selection) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_domainRotate).call(this, selection)), (update) => {
            update
                .attr('x', (d) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getX).call(this, d))
                .attr('y', (d) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getY).call(this, d))
                .attr('text-anchor', label.textAlign)
                .attr('dominant-baseline', () => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_textVerticalAlign).call(this))
                .text((d, i, nodes) => 
            // eslint-disable-next-line implicit-arrow-linebreak
            dateHelper.format(d, format, nodes[i]))
                .call((selection) => __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_domainRotate).call(this, selection));
        });
    }
}
_DomainLabelPainter_instances = new WeakSet(), _DomainLabelPainter_textVerticalAlign = function _DomainLabelPainter_textVerticalAlign() {
    const { position, rotate } = this.calendar.options.options.domain.label;
    if (isVertical(position)) {
        return 'middle';
    }
    if ((rotate === 'left' && position === 'left') ||
        (rotate === 'right' && position === 'right')) {
        return 'bottom';
    }
    return 'hanging';
}, _DomainLabelPainter_getX = function _DomainLabelPainter_getX(d) {
    const { padding, label: { position, textAlign, offset }, } = this.calendar.options.options.domain;
    const { domainHorizontalLabelWidth } = this.calendar.options.options.x;
    let x = padding[Position.LEFT];
    if (position === 'right') {
        x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
    }
    if (textAlign === 'middle') {
        if (['top', 'bottom'].includes(position)) {
            x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d) / 2;
        }
        else {
            x += domainHorizontalLabelWidth / 2;
        }
    }
    if (textAlign === 'end') {
        if (isVertical(position)) {
            x += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
        }
        else {
            x += domainHorizontalLabelWidth;
        }
    }
    return x + offset.x;
}, _DomainLabelPainter_getY = function _DomainLabelPainter_getY(d) {
    const { domain: { label: { position, offset }, padding, }, x, } = this.calendar.options.options;
    let y = padding[Position.TOP] + x.domainVerticalLabelHeight / 2;
    if (position === 'bottom') {
        y += __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(this, d);
    }
    return y + offset.y;
}, _DomainLabelPainter_getDomainInsideWidth = function _DomainLabelPainter_getDomainInsideWidth(d) {
    const { domain: { padding }, x: { domainHorizontalLabelWidth }, } = this.calendar.options.options;
    const { coordinates } = this.calendar.calendarPainter.domainsContainerPainter.domainPainter;
    return (coordinates.get(d).inner_width -
        domainHorizontalLabelWidth -
        horizontalPadding(padding));
}, _DomainLabelPainter_getDomainInsideHeight = function _DomainLabelPainter_getDomainInsideHeight(d) {
    const { x: { domainVerticalLabelHeight }, domain: { padding }, } = this.calendar.options.options;
    const { coordinates } = this.calendar.calendarPainter.domainsContainerPainter.domainPainter;
    return (coordinates.get(d).inner_height -
        domainVerticalLabelHeight -
        verticalPadding(padding));
}, _DomainLabelPainter_domainRotate = function _DomainLabelPainter_domainRotate(selection) {
    const { domain: { label: { rotate, textAlign, position }, }, x, } = this.calendar.options.options;
    const labelWidth = x.domainHorizontalLabelWidth;
    switch (rotate) {
        // Rotating the text clockwise
        case 'right':
            selection.attr('transform', (d) => {
                const domainWidth = __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
                const domainHeight = __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(this, d);
                const s = [
                    `rotate(90, ${position === 'right' ? domainWidth : labelWidth}, 0)`,
                ];
                switch (position) {
                    case 'right':
                        if (textAlign === 'middle') {
                            s.push(`translate(${domainHeight / 2 - labelWidth / 2})`);
                        }
                        else if (textAlign === 'end') {
                            s.push(`translate(${domainHeight - labelWidth})`);
                        }
                        break;
                    case 'left':
                        if (textAlign === 'start') {
                            s.push(`translate(${labelWidth})`);
                        }
                        else if (textAlign === 'middle') {
                            s.push(`translate(${labelWidth / 2 + domainHeight / 2})`);
                        }
                        else if (textAlign === 'end') {
                            s.push(`translate(${domainHeight})`);
                        }
                        break;
                    default:
                }
                return s.join(',');
            });
            break;
        // Rotating the text anticlockwise
        case 'left':
            selection.attr('transform', (d) => {
                const domainWidth = __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideWidth).call(this, d);
                const domainHeight = __classPrivateFieldGet(this, _DomainLabelPainter_instances, "m", _DomainLabelPainter_getDomainInsideHeight).call(this, d);
                const s = [
                    `rotate(270, ${position === 'right' ? domainWidth : labelWidth}, 0)`,
                ];
                switch (position) {
                    case 'right':
                        if (textAlign === 'start') {
                            s.push(`translate(-${domainHeight})`);
                        }
                        else if (textAlign === 'middle') {
                            s.push(`translate(-${domainHeight / 2 + labelWidth / 2})`);
                        }
                        else if (textAlign === 'end') {
                            s.push(`translate(-${labelWidth})`);
                        }
                        break;
                    case 'left':
                        if (textAlign === 'start') {
                            s.push(`translate(${labelWidth - domainHeight})`);
                        }
                        else if (textAlign === 'middle') {
                            s.push(`translate(${labelWidth / 2 - domainHeight / 2})`);
                        }
                        break;
                    default:
                }
                return s.join(',');
            });
            break;
        default:
    }
};
