import type CalHeatmap from '../CalHeatmap';
import { PluginDefinition, PluginOptions, IPlugin } from '../index';
type PluginSetting = {
    options?: PluginOptions;
    dirty: boolean;
};
export default class PluginManager {
    calendar: CalHeatmap;
    settings: Map<IPlugin['name'], PluginSetting>;
    plugins: Map<IPlugin['name'], IPlugin>;
    pendingPaint: Set<IPlugin>;
    constructor(calendar: CalHeatmap);
    add(plugins: PluginDefinition[]): void;
    setupAll(): void;
    paintAll(): Promise<unknown>[];
    destroyAll(): Promise<unknown>[];
    getFromPosition(position: PluginOptions['position']): IPlugin[];
    getHeightFromPosition(position: PluginOptions['position']): number;
    getWidthFromPosition(position: PluginOptions['position']): number;
    allPlugins(): IPlugin[];
}
export {};
