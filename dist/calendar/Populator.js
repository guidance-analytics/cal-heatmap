export default class Populator {
    constructor(calendar) {
        this.calendar = calendar;
    }
    populate() {
        const { calendar } = this;
        const { scale, subDomain } = calendar.options.options;
        calendar.calendarPainter
            .root.selectAll('.ch-domain')
            .selectAll('svg')
            .selectAll('g')
            .data((d) => calendar.domainCollection.get(d) || [])
            .call((element) => {
            const rect = element.select('rect');
            rect.style('fill', (d) => { var _a; return (d.v !== undefined && d.v !== null ? (_a = scale === null || scale === void 0 ? void 0 : scale(d.v)) !== null && _a !== void 0 ? _a : null : null); });
        })
            .call((element) => {
            element
                .select('text')
                .text((d, i, nodes) => 
            // eslint-disable-next-line implicit-arrow-linebreak
            calendar.dateHelper.format(d.t, subDomain.label, d.v, nodes[i]));
        })
            .call(() => {
            calendar.eventEmitter.emit('fill');
        });
    }
}
