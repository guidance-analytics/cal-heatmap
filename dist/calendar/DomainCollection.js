var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DomainCollection_instances, _DomainCollection_setSubDomainValues, _DomainCollection_extractValues, _DomainCollection_refreshKeys;
import castArray from 'lodash-es/castArray';
export const DOMAIN_FORMAT = {
    year: 'YYYY',
    month: 'MMMM',
    week: 'wo [week] YYYY',
    xDay: 'Do MMM',
    ghDay: 'Do MMM',
    day: 'Do MMM',
    hour: 'HH:00',
    minute: 'HH:mm',
};
export default class DomainCollection {
    constructor(dateHelper, interval, start, range, excludeEnd = false) {
        _DomainCollection_instances.add(this);
        this.collection = new Map();
        this.dateHelper = dateHelper;
        if (interval && start && range) {
            const ts = this.dateHelper
                .intervals(interval, start, range, excludeEnd)
                .map((d) => castArray(d));
            // @ts-ignore
            this.collection = new Map(ts);
        }
        this.min = 0;
        this.max = 0;
        this.keys = [];
        this.yankedDomains = [];
        if (this.collection.size > 0) {
            __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        }
    }
    has(key) {
        return this.collection.has(key);
    }
    get(key) {
        return this.collection.get(key);
    }
    forEach(callback) {
        return this.collection.forEach(callback);
    }
    at(index) {
        return this.keys[index];
    }
    clamp(minDate, maxDate) {
        if (minDate && this.min < minDate) {
            this.keys
                .filter((key) => key < minDate)
                .forEach((d) => this.collection.delete(d));
        }
        if (maxDate && this.max > maxDate) {
            this.keys
                .filter((key) => key > maxDate)
                .forEach((d) => this.collection.delete(d));
        }
        __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        return this;
    }
    merge(newCollection, limit, createValueCallback) {
        this.yankedDomains = [];
        newCollection.keys.forEach((domainKey, index) => {
            if (this.has(domainKey)) {
                return;
            }
            if (this.collection.size >= limit) {
                let keyToRemove = this.max;
                if (domainKey > this.max) {
                    keyToRemove = this.min;
                }
                if (keyToRemove && this.collection.delete(keyToRemove)) {
                    this.yankedDomains.push(keyToRemove);
                }
            }
            this.collection.set(domainKey, createValueCallback(domainKey, index));
            __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        });
        this.yankedDomains = this.yankedDomains.sort((a, b) => a - b);
    }
    slice(limit = 0, fromBeginning = true) {
        if (this.keys.length > limit) {
            const keysToDelete = fromBeginning ?
                this.keys.slice(0, -limit) :
                this.keys.slice(limit);
            keysToDelete.forEach((key) => {
                this.collection.delete(key);
            });
            __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_refreshKeys).call(this);
        }
        return this;
    }
    fill(data, { x, y, groupY, defaultValue, }, subDomainKeyExtractor) {
        const groupedRecords = this.groupRecords(data, x, subDomainKeyExtractor);
        this.keys.forEach((domainKey) => {
            const records = groupedRecords.get(domainKey) || {};
            __classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_setSubDomainValues).call(this, domainKey, records, y, groupY, defaultValue);
        });
    }
    groupRecords(data, x, subDomainKeyExtractor) {
        const results = new Map();
        const validSubDomainTimestamp = new Map();
        this.keys.forEach((domainKey) => {
            this.get(domainKey).forEach((subDomain) => {
                validSubDomainTimestamp.set(subDomain.t, domainKey);
            });
        });
        data.forEach((d) => {
            const timestamp = this.extractTimestamp(d, x, subDomainKeyExtractor);
            if (validSubDomainTimestamp.has(timestamp)) {
                const domainKey = validSubDomainTimestamp.get(timestamp);
                const records = results.get(domainKey) || {};
                records[timestamp] || (records[timestamp] = []);
                records[timestamp].push(d);
                results.set(domainKey, records);
            }
        });
        return results;
    }
    // eslint-disable-next-line class-methods-use-this
    groupValues(values, groupFn) {
        const cleanedValues = values.filter((n) => n !== null);
        if (typeof groupFn === 'string') {
            if (cleanedValues.every((n) => typeof n === 'number')) {
                switch (groupFn) {
                    case 'sum':
                        return cleanedValues.reduce((a, b) => a + b, 0);
                    case 'count':
                        return cleanedValues.length;
                    case 'min':
                        return Math.min(...cleanedValues) || null;
                    case 'max':
                        return Math.max(...cleanedValues) || null;
                    case 'average':
                        return cleanedValues.length > 0 ?
                            cleanedValues.reduce((a, b) => a + b, 0) /
                                cleanedValues.length :
                            null;
                    default:
                        return null;
                }
            }
            switch (groupFn) {
                case 'count':
                    return cleanedValues.length;
                default:
                    return null;
            }
        }
        else if (typeof groupFn === 'function') {
            return groupFn(cleanedValues);
        }
        return null;
    }
    // eslint-disable-next-line class-methods-use-this
    extractTimestamp(datum, x, extractorFn) {
        let timestamp = typeof x === 'function' ? x(datum) : datum[x];
        if (typeof timestamp === 'string') {
            timestamp = +new Date(timestamp);
        }
        return extractorFn(timestamp);
    }
}
_DomainCollection_instances = new WeakSet(), _DomainCollection_setSubDomainValues = function _DomainCollection_setSubDomainValues(domainKey, records, y, groupY, defaultValue) {
    this.get(domainKey).forEach((subDomain, index) => {
        let value = defaultValue;
        if (records.hasOwnProperty(subDomain.t)) {
            value = this.groupValues(__classPrivateFieldGet(this, _DomainCollection_instances, "m", _DomainCollection_extractValues).call(this, records[subDomain.t], y), groupY);
        }
        this.get(domainKey)[index].v = value;
    });
}, _DomainCollection_extractValues = function _DomainCollection_extractValues(data, y) {
    return data.map((d) => (typeof y === 'function' ? y(d) : d[y]));
}, _DomainCollection_refreshKeys = function _DomainCollection_refreshKeys() {
    this.keys = Array.from(this.collection.keys())
        .map((d) => parseInt(d, 10))
        .sort((a, b) => a - b);
    const { keys } = this;
    // eslint-disable-next-line prefer-destructuring
    this.min = keys[0];
    this.max = keys[keys.length - 1];
    return this.keys;
};
