import DomainsContainerPainter from '../domain/DomainsContainerPainter';
import PluginPainter from '../plugins/PluginPainter';
import type CalHeatmap from '../CalHeatmap';
import { ScrollDirection } from '../constant';
import type { Dimensions } from '../CalHeatmap';
export declare const DEFAULT_SELECTOR = ".ch-container";
export default class CalendarPainter {
    #private;
    calendar: CalHeatmap;
    dimensions: Dimensions;
    root: any;
    domainsContainerPainter: DomainsContainerPainter;
    pluginPainter: PluginPainter;
    constructor(calendar: CalHeatmap);
    setup(): boolean;
    paint(navigationDir?: ScrollDirection): Promise<PromiseSettledResult<unknown>[]>;
    destroy(): Promise<unknown>;
}
