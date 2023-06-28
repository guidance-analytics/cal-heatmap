import type { DataOptions } from './options/Options';
import type { Timestamp } from './index';
import type CalHeatmap from './CalHeatmap';
export default class DataFetcher {
    #private;
    calendar: CalHeatmap;
    constructor(calendar: CalHeatmap);
    /**
     * Fetch and interpret data from the datasource
     *
     * @param {string|object} source
     * @param {number} startTimestamp
     * @param {number} endTimestamp
     *
     * @return {Promize} A promise, that will return the final data when resolved
     */
    getDatas(source: DataOptions['source'], startTimestamp: Timestamp, endTimestamp: Timestamp): Promise<unknown>;
    parseURI(str: string, startTimestamp: Timestamp, endTimestamp: Timestamp): string;
}
