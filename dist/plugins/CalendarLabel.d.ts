import type CalHeatmap from '../CalHeatmap';
import type { IPlugin, PluginOptions } from '../CalHeatmap';
import type { TextAlign, Padding } from '../options/Options';
type ComputedOptions = {
    radius: number;
    width: number;
    height: number;
    gutter: number;
    textAlign: TextAlign;
};
interface CalendarLabelOptions extends PluginOptions, Partial<ComputedOptions> {
    enabled: boolean;
    text: () => string[];
    padding: Padding;
}
export default class CalendarLabel implements IPlugin {
    #private;
    name: string;
    calendar: CalHeatmap;
    root: any;
    shown: boolean;
    options: CalendarLabelOptions;
    computedOptions: ComputedOptions;
    constructor(calendar: CalHeatmap);
    setup(pluginOptions?: Partial<CalendarLabelOptions>): void;
    paint(): Promise<unknown>;
    destroy(): Promise<unknown>;
    build(): Promise<void>;
}
export {};
