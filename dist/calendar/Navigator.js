var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Navigator_instances, _Navigator_isDomainBoundaryReached, _Navigator_setDomainsBoundaryReached;
import { ScrollDirection } from '../constant';
class Navigator {
    constructor(calendar) {
        _Navigator_instances.add(this);
        this.calendar = calendar;
        this.maxDomainReached = false;
        this.minDomainReached = false;
    }
    loadNewDomains(newDomainCollection, direction = ScrollDirection.SCROLL_NONE) {
        const { options } = this.calendar.options;
        const templatesClt = this.calendar.templateCollection;
        const minDate = options.date.min ?
            templatesClt.get(options.domain.type).extractUnit(+options.date.min) :
            undefined;
        const maxDate = options.date.max ?
            templatesClt.get(options.domain.type).extractUnit(+options.date.max) :
            undefined;
        const { domainCollection } = this.calendar;
        if (__classPrivateFieldGet(this, _Navigator_instances, "m", _Navigator_isDomainBoundaryReached).call(this, newDomainCollection, minDate, maxDate, direction)) {
            return ScrollDirection.SCROLL_NONE;
        }
        if (direction !== ScrollDirection.SCROLL_NONE) {
            newDomainCollection
                .clamp(minDate, maxDate)
                .slice(options.range, direction === ScrollDirection.SCROLL_FORWARD);
        }
        domainCollection.merge(newDomainCollection, options.range, (domainKey, index) => {
            let subDomainEndDate = null;
            if (newDomainCollection.at(index + 1)) {
                subDomainEndDate = newDomainCollection.at(index + 1);
            }
            else {
                subDomainEndDate = this.calendar.dateHelper
                    .intervals(options.domain.type, domainKey, 2)
                    .pop();
            }
            return templatesClt
                .get(options.subDomain.type)
                .mapping(domainKey, subDomainEndDate)
                .map((d) => (Object.assign(Object.assign({}, d), { v: options.data.defaultValue })));
        });
        __classPrivateFieldGet(this, _Navigator_instances, "m", _Navigator_setDomainsBoundaryReached).call(this, domainCollection.min, domainCollection.max, minDate, maxDate);
        if (direction === ScrollDirection.SCROLL_BACKWARD) {
            this.calendar.eventEmitter.emit('domainsLoaded', [domainCollection.min]);
        }
        else if (direction === ScrollDirection.SCROLL_FORWARD) {
            this.calendar.eventEmitter.emit('domainsLoaded', [domainCollection.max]);
        }
        return direction;
    }
    jumpTo(date, reset) {
        const { domainCollection, options } = this.calendar;
        const minDate = new Date(domainCollection.min);
        const maxDate = new Date(domainCollection.max);
        if (date < minDate) {
            return this.loadNewDomains(this.calendar.createDomainCollection(date, minDate, false), ScrollDirection.SCROLL_BACKWARD);
        }
        if (reset) {
            return this.loadNewDomains(this.calendar.createDomainCollection(date, options.options.range), minDate < date ?
                ScrollDirection.SCROLL_FORWARD :
                ScrollDirection.SCROLL_BACKWARD);
        }
        if (date > maxDate) {
            return this.loadNewDomains(this.calendar.createDomainCollection(maxDate, date, false), ScrollDirection.SCROLL_FORWARD);
        }
        return ScrollDirection.SCROLL_NONE;
    }
}
_Navigator_instances = new WeakSet(), _Navigator_isDomainBoundaryReached = function _Navigator_isDomainBoundaryReached(newDomainCollection, minDate, maxDate, direction) {
    if (maxDate &&
        newDomainCollection.max >= maxDate &&
        this.maxDomainReached &&
        direction === ScrollDirection.SCROLL_FORWARD) {
        return true;
    }
    if (minDate &&
        newDomainCollection.min <= minDate &&
        this.minDomainReached &&
        direction === ScrollDirection.SCROLL_BACKWARD) {
        return true;
    }
    return false;
}, _Navigator_setDomainsBoundaryReached = function _Navigator_setDomainsBoundaryReached(lowerBound, upperBound, min, max) {
    if (min) {
        const reached = lowerBound <= min;
        this.calendar.eventEmitter.emit(reached ? 'minDateReached' : 'minDateNotReached');
        this.minDomainReached = reached;
    }
    if (max) {
        const reached = upperBound >= max;
        this.calendar.eventEmitter.emit(reached ? 'maxDateReached' : 'maxDateNotReached');
        this.maxDomainReached = reached;
    }
};
export default Navigator;
