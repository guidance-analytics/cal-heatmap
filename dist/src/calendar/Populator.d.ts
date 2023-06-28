import type CalHeatmap from '../CalHeatmap';
export default class Populator {
    calendar: CalHeatmap;
    constructor(calendar: CalHeatmap);
    populate(): void;
}
