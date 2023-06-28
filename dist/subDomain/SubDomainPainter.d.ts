import type CalHeatmap from '../CalHeatmap';
export declare const DEFAULT_SELECTOR = ".ch-subdomain";
export default class SubDomainPainter {
    #private;
    calendar: CalHeatmap;
    root: any;
    constructor(calendar: CalHeatmap);
    paint(root: any): void;
}
