import type CalHeatmap from '../CalHeatmap';
import type { IPlugin, PluginOptions } from '../index';
interface LegendOptions extends PluginOptions {
    enabled: boolean;
    itemSelector: string | null;
    label: string | null;
    width: number;
}
export default class Legend implements IPlugin {
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
