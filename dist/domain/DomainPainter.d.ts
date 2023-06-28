import DomainCoordinates from './DomainCoordinates';
import type CalHeatmap from '../CalHeatmap';
import type { ScrollDirection } from '../constant';
import type { Dimensions } from '../CalHeatmap';
export default class DomainPainter {
    #private;
    calendar: CalHeatmap;
    coordinates: DomainCoordinates;
    root: any;
    dimensions: Dimensions;
    constructor(calendar: CalHeatmap);
    paint(scrollDirection: ScrollDirection, rootNode: any): Promise<unknown>[];
}
