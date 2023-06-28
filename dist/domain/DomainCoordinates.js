var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomainCoordinates_instances, _DomainCoordinates_getWidth, _DomainCoordinates_getHeight;
import { ScrollDirection } from '../constant';
import { horizontalPadding, verticalPadding } from '../helpers/PositionHelper';
class DomainCoordinates {
    constructor(calendar, domainPainter) {
        _DomainCoordinates_instances.add(this);
        this.calendar = calendar;
        this.domainPainter = domainPainter;
        this.collection = new Map();
        this.scrollDirection = ScrollDirection.SCROLL_FORWARD;
    }
    get(domainKey) {
        return this.collection.get(domainKey);
    }
    update(collection, scrollDirection) {
        const { verticalOrientation, domain } = this.calendar.options.options;
        this.scrollDirection = scrollDirection;
        const dimensions = {
            width: 0,
            height: 0,
        };
        let exitingTotal = 0;
        let scrollFactor = scrollDirection === ScrollDirection.SCROLL_FORWARD ? -1 : 1;
        const { keys } = collection;
        if (this.calendar.options.options.domain.sort === 'desc') {
            keys.reverse();
            scrollFactor *= -1;
        }
        collection.yankedDomains.forEach((domainKey) => {
            exitingTotal +=
                this.collection.get(domainKey)[verticalOrientation ? 'height' : 'width'];
        });
        collection.yankedDomains.forEach((domainKey) => {
            const coor = this.collection.get(domainKey);
            this.collection.set(domainKey, Object.assign(Object.assign({}, coor), { x: verticalOrientation ? coor.x : coor.x + exitingTotal * scrollFactor, y: verticalOrientation ? coor.y + exitingTotal * scrollFactor : coor.y }));
        });
        keys.forEach((domainKey) => {
            const w = __classPrivateFieldGet(this, _DomainCoordinates_instances, "m", _DomainCoordinates_getWidth).call(this, domainKey);
            const h = __classPrivateFieldGet(this, _DomainCoordinates_instances, "m", _DomainCoordinates_getHeight).call(this, domainKey);
            if (verticalOrientation) {
                dimensions.height += h;
                dimensions.width = Math.max(w, dimensions.width);
            }
            else {
                dimensions.width += w;
                dimensions.height = Math.max(h, dimensions.height);
            }
            const x = dimensions.width - w;
            const y = dimensions.height - h;
            this.collection.set(domainKey, Object.assign(Object.assign({}, this.collection.get(domainKey)), { x: verticalOrientation ? 0 : x, y: verticalOrientation ? y : 0, pre_x: verticalOrientation ? x : x - exitingTotal * scrollFactor, pre_y: verticalOrientation ? y - exitingTotal * scrollFactor : y, width: w, height: h, inner_width: w - (verticalOrientation ? 0 : domain.gutter), inner_height: h - (!verticalOrientation ? 0 : domain.gutter) }));
        });
        return dimensions;
    }
}
_DomainCoordinates_instances = new WeakSet(), _DomainCoordinates_getWidth = function _DomainCoordinates_getWidth(d) {
    const { domain, subDomain, x, verticalOrientation, } = this.calendar.options.options;
    const columnsCount = this.calendar.templateCollection
        .get(subDomain.type)
        .columnsCount(d);
    const subDomainWidth = (subDomain.width + subDomain.gutter) * columnsCount - subDomain.gutter;
    return (horizontalPadding(domain.padding) +
        x.domainHorizontalLabelWidth +
        (verticalOrientation ? 0 : domain.gutter) +
        subDomainWidth);
}, _DomainCoordinates_getHeight = function _DomainCoordinates_getHeight(d) {
    const { domain, subDomain, x, verticalOrientation, } = this.calendar.options.options;
    const rowsCount = this.calendar.templateCollection
        .get(subDomain.type)
        .rowsCount(d);
    const subDomainHeight = (subDomain.height + subDomain.gutter) * rowsCount - subDomain.gutter;
    return (verticalPadding(domain.padding) +
        subDomainHeight +
        (verticalOrientation ? domain.gutter : 0) +
        x.domainVerticalLabelHeight);
};
export default DomainCoordinates;
