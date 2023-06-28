import type CalHeatmap from '../CalHeatmap';
export default class DomainLabelPainter {
    #private;
    calendar: CalHeatmap;
    constructor(calendar: CalHeatmap);
    paint(root: any): void;
}
