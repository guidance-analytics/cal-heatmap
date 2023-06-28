import type CalHeatmap from '../CalHeatmap';
declare class PluginPainter {
    calendar: CalHeatmap;
    constructor(calendar: CalHeatmap);
    paint(): Promise<unknown>[];
    setPluginsPosition(): Promise<unknown>[];
    insideWidth(): number;
    insideHeight(): number;
}
export default PluginPainter;
