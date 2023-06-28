import type CalHeatmap from '../CalHeatmap';
import type { IPlugin, PluginOptions } from '../CalHeatmap';
interface LegendOptions extends PluginOptions {
    enabled: boolean;
    itemSelector: string | null;
    width: number;
    height: number;
    radius: number;
    gutter: number;
    includeBlank: boolean;
}
export default class LegendLite implements IPlugin {
    #private;
    name: string;
    calendar: CalHeatmap;
    root: any;
    shown: boolean;
    options: LegendOptions;
    constructor(calendar: CalHeatmap);
    setup(pluginOptions?: Partial<LegendOptions>): void;
    paint(): Promise<unknown>;
    destroy(): Promise<unknown>;
}
export {};
