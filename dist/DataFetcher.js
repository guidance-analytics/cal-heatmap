var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DataFetcher_instances, _DataFetcher_fetch;
import { json, csv, dsv, text, } from 'd3-fetch';
export default class DataFetcher {
    constructor(calendar) {
        _DataFetcher_instances.add(this);
        this.calendar = calendar;
    }
    /**
     * Fetch and interpret data from the datasource
     *
     * @param {string|object} source
     * @param {number} startTimestamp
     * @param {number} endTimestamp
     *
     * @return {Promize} A promise, that will return the final data when resolved
     */
    getDatas(source, startTimestamp, endTimestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof source === 'string' && source.length > 0) {
                return __classPrivateFieldGet(this, _DataFetcher_instances, "m", _DataFetcher_fetch).call(this, source, startTimestamp, endTimestamp);
            }
            let d = [];
            if (Array.isArray(source)) {
                d = source;
            }
            return new Promise((resolve) => {
                resolve(d);
            });
        });
    }
    parseURI(str, startTimestamp, endTimestamp) {
        let newUri = str.replace(/\{\{start=(.*)\}\}/g, (_, format) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        this.calendar.dateHelper.date(startTimestamp).format(format));
        newUri = newUri.replace(/\{\{end=(.*)\}\}/g, (_, format) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        this.calendar.dateHelper.date(endTimestamp).format(format));
        return newUri;
    }
}
_DataFetcher_instances = new WeakSet(), _DataFetcher_fetch = function _DataFetcher_fetch(source, startTimestamp, endTimestamp) {
    const { type, requestInit } = this.calendar.options.options.data;
    const url = this.parseURI(source, startTimestamp, endTimestamp);
    switch (type) {
        case 'json':
            return json(url, requestInit);
        case 'csv':
            return csv(url, requestInit);
        case 'tsv':
            return dsv('\t', url, requestInit);
        case 'txt':
            return text(url, requestInit);
        default:
            return new Promise((resolve) => {
                resolve([]);
            });
    }
};
