var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SubDomainPainter_instances, _SubDomainPainter_setPositions, _SubDomainPainter_classname, _SubDomainPainter_appendText, _SubDomainPainter_getCoordinates, _SubDomainPainter_getX, _SubDomainPainter_getY;
import { Position } from '../constant';
export const DEFAULT_SELECTOR = '.ch-subdomain';
const HIGHLIGHT_CLASSNAME = 'highlight';
export default class SubDomainPainter {
    constructor(calendar) {
        _SubDomainPainter_instances.add(this);
        this.calendar = calendar;
        this.root = null;
    }
    paint(root) {
        this.root = root || this.root;
        const containerClassname = `${DEFAULT_SELECTOR}-container`;
        const subDomainSvgGroup = this.root
            .selectAll(containerClassname)
            .data((d) => [d], (d) => d)
            .join((enter) => enter
            .append('svg')
            .call((selection) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_setPositions).call(this, selection))
            .attr('class', containerClassname.slice(1)), (update) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        update.call((selection) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_setPositions).call(this, selection)));
        const { subDomain: { radius, width, height, sort, }, } = this.calendar.options.options;
        const evt = this.calendar.eventEmitter;
        subDomainSvgGroup
            .selectAll('g')
            .data((d) => {
            const subDomainsCollection = this.calendar.domainCollection.get(d);
            if (sort === 'desc') {
                const max = Math.max(...subDomainsCollection.map((s) => s.x));
                subDomainsCollection.forEach((s, i) => {
                    subDomainsCollection[i].x = Math.abs(s.x - max);
                });
            }
            return subDomainsCollection;
        })
            .join((enter) => enter
            .append('g')
            .call((selection) => selection
            .insert('rect')
            .attr('class', (d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(this, d.t, `${DEFAULT_SELECTOR.slice(1)}-bg`))
            .attr('width', width)
            .attr('height', height)
            .attr('x', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(this, d))
            .attr('y', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(this, d))
            .on('click', (ev, d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        evt.emit('click', ev, d.t, d.v))
            .on('mouseover', (ev, d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        evt.emit('mouseover', ev, d.t, d.v))
            .on('mouseout', (ev, d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        evt.emit('mouseout', ev, d.t, d.v))
            .attr('rx', radius > 0 ? radius : null)
            .attr('ry', radius > 0 ? radius : null))
            .call((selection) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_appendText).call(this, selection)), (update) => update
            .selectAll('rect')
            .attr('class', (d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(this, d.t, `${DEFAULT_SELECTOR.slice(1)}-bg`))
            .attr('width', width)
            .attr('height', height)
            .attr('x', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(this, d))
            .attr('y', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(this, d))
            .attr('rx', radius)
            .attr('ry', radius));
    }
}
_SubDomainPainter_instances = new WeakSet(), _SubDomainPainter_setPositions = function _SubDomainPainter_setPositions(selection) {
    const { options } = this.calendar.options;
    const { padding, label: { position }, } = options.domain;
    selection
        .attr('x', () => {
        let pos = padding[Position.LEFT];
        if (position === 'left') {
            pos += options.x.domainHorizontalLabelWidth;
        }
        return pos;
    })
        .attr('y', () => {
        let pos = padding[Position.TOP];
        if (position === 'top') {
            pos += options.x.domainVerticalLabelHeight;
        }
        return pos;
    });
}, _SubDomainPainter_classname = function _SubDomainPainter_classname(timestamp, ...otherClasses) {
    const { date: { highlight }, subDomain: { type }, } = this.calendar.options.options;
    let classname = '';
    if (highlight.length > 0) {
        highlight.forEach((d) => {
            const unitFn = this.calendar.templateCollection.get(type).extractUnit;
            if (unitFn(+d) === unitFn(timestamp)) {
                classname = HIGHLIGHT_CLASSNAME;
            }
        });
    }
    return [classname, ...otherClasses].join(' ').trim();
}, _SubDomainPainter_appendText = function _SubDomainPainter_appendText(elem) {
    const { width, height, label } = this.calendar.options.options.subDomain;
    if (!label) {
        return null;
    }
    return elem
        .append('text')
        .attr('class', (d) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_classname).call(this, d.t, `${DEFAULT_SELECTOR.slice(1)}-text`))
        .attr('x', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getX).call(this, d) + width / 2)
        .attr('y', (d) => __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getY).call(this, d) + height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text((d, i, nodes) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    this.calendar.dateHelper.format(d.t, label, d.v, nodes[i]));
}, _SubDomainPainter_getCoordinates = function _SubDomainPainter_getCoordinates(axis, d) {
    const { subDomain } = this.calendar.options.options;
    return (d[axis] *
        (subDomain[axis === 'x' ? 'width' : 'height'] + subDomain.gutter));
}, _SubDomainPainter_getX = function _SubDomainPainter_getX(d) {
    return __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getCoordinates).call(this, 'x', d);
}, _SubDomainPainter_getY = function _SubDomainPainter_getY(d) {
    return __classPrivateFieldGet(this, _SubDomainPainter_instances, "m", _SubDomainPainter_getCoordinates).call(this, 'y', d);
};
