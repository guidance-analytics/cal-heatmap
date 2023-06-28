import DomainPainter from './DomainPainter';
import DomainLabelPainter from './DomainLabelPainter';
import SubDomainPainter from '../subDomain/SubDomainPainter';
import { ScrollDirection } from '../constant';
import type CalHeatmap from '../CalHeatmap';
import type { Dimensions } from '../CalHeatmap';
declare class DomainsContainerPainter {
    #private;
    calendar: CalHeatmap;
    domainPainter: DomainPainter;
    domainLabelPainter: DomainLabelPainter;
    subDomainPainter: SubDomainPainter;
    dimensions: Dimensions;
    root: any;
    transitionsQueueCount: number;
    constructor(calendar: CalHeatmap);
    setup(): void;
    paint(scrollDirection: ScrollDirection): Promise<unknown>[];
    updatePosition(): Promise<void> | Promise<void>[];
    width(): Dimensions['width'];
    height(): Dimensions['height'];
    destroy(): Promise<unknown>;
}
export default DomainsContainerPainter;
