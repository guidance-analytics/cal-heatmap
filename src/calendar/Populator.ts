import type CalHeatmap from '../CalHeatmap';
import type { SubDomain, Timestamp } from '../CalHeatmap';

export default class Populator {
  calendar: CalHeatmap;

  constructor(calendar: CalHeatmap) {
    this.calendar = calendar;
  }

  populate(): void {
    const { calendar } = this;
    const { scale, subDomain } = calendar.options.options;

    calendar.calendarPainter
      .root!.selectAll('.ch-domain')
      .selectAll('svg')
      .selectAll('g')
      .data((d: Timestamp) => calendar.domainCollection.get(d) || [])
      .call((element: any) => {
        const rect = element.select('rect');
        rect.style(
          'fill',
          (d: any) => (d.v !== undefined && d.v !== null ? scale?.(d.v) ?? null : null),
        );
      })
      .call((element: any) => {
        element
          .select('text')
          .text((d: SubDomain, i: number, nodes: any[]) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            calendar.dateHelper.format(d.t, subDomain.label, d.v, nodes[i]));
      })
      .call(() => {
        calendar.eventEmitter.emit('fill');
      });
  }
}
