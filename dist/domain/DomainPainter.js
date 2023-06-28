var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomainPainter_instances, _DomainPainter_getClassName;
import DomainCoordinates from './DomainCoordinates';
const DEFAULT_SELECTOR = '.ch-domain';
export default class DomainPainter {
    constructor(calendar) {
        _DomainPainter_instances.add(this);
        this.calendar = calendar;
        this.coordinates = new DomainCoordinates(calendar, this);
        this.root = null;
        // Dimensions of the internal area containing all the domains
        // Excluding all surrounding margins
        this.dimensions = {
            width: 0,
            height: 0,
        };
    }
    paint(scrollDirection, rootNode) {
        const { animationDuration } = this.calendar.options.options;
        const t = rootNode.transition().duration(animationDuration);
        const coor = this.coordinates;
        this.dimensions = coor.update(this.calendar.domainCollection, scrollDirection);
        const promises = [];
        this.root = rootNode
            .selectAll(DEFAULT_SELECTOR)
            .data(this.calendar.domainCollection.keys, (d) => d)
            .join((enter) => enter
            .append('svg')
            .attr('x', (d) => coor.get(d).pre_x)
            .attr('y', (d) => coor.get(d).pre_y)
            .attr('width', (d) => coor.get(d).inner_width)
            .attr('height', (d) => coor.get(d).inner_height)
            .attr('class', (d) => __classPrivateFieldGet(this, _DomainPainter_instances, "m", _DomainPainter_getClassName).call(this, d))
            .call((enterSelection) => enterSelection
            .append('rect')
            .attr('width', (d) => coor.get(d).inner_width)
            .attr('height', (d) => coor.get(d).inner_height)
            .attr('class', `${DEFAULT_SELECTOR.slice(1)}-bg`))
            .call((enterSelection) => promises.push(enterSelection
            .transition(t)
            .attr('x', (d) => coor.get(d).x)
            .attr('y', (d) => coor.get(d).y)
            .end())), (update) => update
            .call((updateSelection) => promises.push(updateSelection
            .transition(t)
            .attr('x', (d) => coor.get(d).x)
            .attr('y', (d) => coor.get(d).y)
            .attr('width', (d) => coor.get(d).inner_width)
            .attr('height', (d) => coor.get(d).inner_height)
            .end()))
            .call((updateSelection) => promises.push(updateSelection
            .selectAll(`${DEFAULT_SELECTOR}-bg`)
            .transition(t)
            .attr('width', (d) => coor.get(d).inner_width)
            .attr('height', (d) => coor.get(d).inner_height)
            .end())), (exit) => exit.call((exitSelection) => promises.push(exitSelection
            .transition(t)
            .attr('x', (d) => coor.get(d).x)
            .attr('y', (d) => coor.get(d).y)
            .remove()
            .end())));
        return promises;
    }
}
_DomainPainter_instances = new WeakSet(), _DomainPainter_getClassName = function _DomainPainter_getClassName(d) {
    let classname = DEFAULT_SELECTOR.slice(1);
    const helper = this.calendar.dateHelper.date(d);
    switch (this.calendar.options.options.domain.type) {
        case 'hour':
            classname += ` h_${helper.hour()}`;
            break;
        case 'day':
            classname += ` d_${helper.date()} dy_${helper.format('d') + 1}`;
            break;
        case 'week':
            classname += ` w_${helper.week()}`;
            break;
        case 'month':
            classname += ` m_${helper.month() + 1}`;
            break;
        case 'year':
            classname += ` y_${helper.year()}`;
            break;
        default:
    }
    return classname;
};
