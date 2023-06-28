import { ScrollDirection } from '../constant';
import type CalHeatmap from '../CalHeatmap';
import type DomainCollection from './DomainCollection';
export default class Navigator {
    #private;
    calendar: CalHeatmap;
    minDomainReached: boolean;
    maxDomainReached: boolean;
    constructor(calendar: CalHeatmap);
    loadNewDomains(newDomainCollection: DomainCollection, direction?: ScrollDirection): ScrollDirection;
    jumpTo(date: Date, reset: boolean): ScrollDirection;
}
