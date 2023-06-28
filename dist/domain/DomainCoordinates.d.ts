import { ScrollDirection } from '../constant';
import type CalHeatmap from '../CalHeatmap';
import type DomainPainter from './DomainPainter';
import type DomainCollection from '../calendar/DomainCollection';
import type { SubDomain, Dimensions, Timestamp } from '../CalHeatmap';
type SubDomainWithCoordinates = Required<SubDomain> & {
    pre_x: number;
    pre_y: number;
    width: number;
    height: number;
    inner_width: number;
    inner_height: number;
};
export default class DomainCoordinates {
    #private;
    calendar: CalHeatmap;
    domainPainter: DomainPainter;
    collection: Map<Timestamp, SubDomainWithCoordinates>;
    scrollDirection: ScrollDirection;
    constructor(calendar: CalHeatmap, domainPainter: DomainPainter);
    get(domainKey: Timestamp): SubDomainWithCoordinates | undefined;
    update(collection: DomainCollection, scrollDirection: ScrollDirection): Dimensions;
}
export {};
