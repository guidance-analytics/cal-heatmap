var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomainsContainerPainter_instances, _DomainsContainerPainter_startAnimation, _DomainsContainerPainter_endAnimation, _DomainsContainerPainter_recomputeDimensions;
import { select } from 'd3-selection';
import DomainPainter from './DomainPainter';
import DomainLabelPainter from './DomainLabelPainter';
import SubDomainPainter from '../subDomain/SubDomainPainter';
const BASE_SELECTOR = '.ch-domain-container';
const TRANSITION_CLASSNAME = 'in-transition';
class DomainsContainerPainter {
    constructor(calendar) {
        _DomainsContainerPainter_instances.add(this);
        this.calendar = calendar;
        this.domainPainter = new DomainPainter(calendar);
        this.subDomainPainter = new SubDomainPainter(calendar);
        this.domainLabelPainter = new DomainLabelPainter(calendar);
        this.dimensions = {
            width: 0,
            height: 0,
        };
        this.transitionsQueueCount = 0;
    }
    setup() {
        this.root = this.calendar.calendarPainter.root
            .attr('x', 0)
            .attr('y', 0)
            .append('svg')
            .attr('class', BASE_SELECTOR.slice(1))
            .append('svg')
            .attr('class', `${BASE_SELECTOR.slice(1)}-animation-wrapper`);
    }
    paint(scrollDirection) {
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_startAnimation).call(this);
        const result = this.domainPainter.paint(scrollDirection, this.root);
        this.subDomainPainter.paint(this.domainPainter.root);
        this.domainLabelPainter.paint(this.domainPainter.root);
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_recomputeDimensions).call(this);
        Promise.allSettled(result).then(() => {
            __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_endAnimation).call(this);
        });
        return result;
    }
    updatePosition() {
        var _a;
        if (!((_a = this.root) === null || _a === void 0 ? void 0 : _a.node())) {
            return Promise.resolve();
        }
        const { animationDuration } = this.calendar.options.options;
        const topHeight = this.calendar.pluginManager.getHeightFromPosition('top');
        const leftWidth = this.calendar.pluginManager.getWidthFromPosition('left');
        return [
            select(this.root.node().parentNode)
                .transition()
                .duration(animationDuration)
                .call((selection) => {
                selection.attr('x', leftWidth).attr('y', topHeight);
            })
                .end(),
        ];
    }
    width() {
        return this.dimensions.width;
    }
    height() {
        return this.dimensions.height;
    }
    destroy() {
        __classPrivateFieldGet(this, _DomainsContainerPainter_instances, "m", _DomainsContainerPainter_startAnimation).call(this);
        return Promise.resolve();
    }
}
_DomainsContainerPainter_instances = new WeakSet(), _DomainsContainerPainter_startAnimation = function _DomainsContainerPainter_startAnimation() {
    var _a;
    if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.node()) {
        this.transitionsQueueCount += 1;
        select(this.root.node().parentNode).classed(TRANSITION_CLASSNAME, true);
    }
}, _DomainsContainerPainter_endAnimation = function _DomainsContainerPainter_endAnimation() {
    var _a;
    if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.node()) {
        this.transitionsQueueCount -= 1;
        if (this.transitionsQueueCount === 0) {
            select(this.root.node().parentNode).classed(TRANSITION_CLASSNAME, false);
        }
    }
}, _DomainsContainerPainter_recomputeDimensions = function _DomainsContainerPainter_recomputeDimensions() {
    const { animationDuration, verticalOrientation, domain: { gutter }, } = this.calendar.options.options;
    const { dimensions: domainsDimensions } = this.domainPainter;
    this.dimensions = {
        width: domainsDimensions.width - (verticalOrientation ? 0 : gutter),
        height: domainsDimensions.height - (!verticalOrientation ? 0 : gutter),
    };
    this.root
        .transition()
        .duration(animationDuration)
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.height);
};
export default DomainsContainerPainter;
