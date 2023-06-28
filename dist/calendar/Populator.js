import isFunction from 'lodash-es/isFunction';
import { hcl } from 'd3-color';
import { normalizedScale, applyScaleStyle } from '../scale';
export default class Populator {
    constructor(calendar) {
        this.calendar = calendar;
    }
    populate() {
        const { calendar } = this;
        const { scale, subDomain } = calendar.options.options;
        const colorScale = normalizedScale(scale);
        calendar.calendarPainter
            .root.selectAll('.ch-domain')
            .selectAll('svg')
            .selectAll('g')
            .data((d) => calendar.domainCollection.get(d) || [])
            .call((element) => {
            applyScaleStyle(element.select('rect'), colorScale, scale, 'v');
        })
            .call((element) => {
            element
                .select('text')
                .attr('style', (d) => {
                const defaultColor = hcl(colorScale === null || colorScale === void 0 ? void 0 : colorScale.apply(d.v)).l > 60 ? '#000' : '#fff';
                let color = subDomain.color || (d.v ? defaultColor : null);
                if (isFunction(color)) {
                    color = color(d.t, d.v, colorScale === null || colorScale === void 0 ? void 0 : colorScale.apply(d.v));
                }
                if (!color) {
                    return null;
                }
                return `fill: ${color};`;
            })
                .text((d, i, nodes) => 
            // eslint-disable-next-line implicit-arrow-linebreak
            calendar.dateHelper.format(d.t, subDomain.label, d.v, nodes[i]));
        })
            .call(() => {
            calendar.eventEmitter.emit('fill');
        });
    }
}
