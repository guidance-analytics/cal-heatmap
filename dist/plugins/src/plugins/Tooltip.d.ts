import type dayjs from 'dayjs';
import type CalHeatmap from '../CalHeatmap';
import type { IPlugin, PluginOptions, Timestamp } from '../index';
interface PopperOptions {
    placement: any;
    modifiers: any[];
    strategy: any;
    onFirstUpdate?: any;
}
interface TooltipOptions extends PluginOptions, PopperOptions {
    enabled: boolean;
    text: (timestamp: Timestamp, value: number, dayjsDate: dayjs.Dayjs) => string;
}
export default class Tooltip implements IPlugin {
    #private;
    name: string;
    calendar: CalHeatmap;
    root: HTMLElement | null;
    popperInstance: any;
    popperOptions: any;
    options: Partial<TooltipOptions>;
    listenerAttached: boolean;
    constructor(calendar: CalHeatmap);
    setup(pluginOptions?: Partial<TooltipOptions>): void;
    mouseOverCallback(e: PointerEvent, timestamp: Timestamp, value: number): void;
    mouseOutCallback(): void;
    paint(): Promise<unknown>;
    destroy(): Promise<unknown>;
}
export {};
