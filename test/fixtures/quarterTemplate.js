const quarterTemplate = (DateHelper) => ({
    name: 'quarter',
    allowedDomainType: ['year'],
    rowsCount() {
        return 1;
    },
    columnsCount() {
        return 4;
    },
    mapping: (startDate, endDate, defaultValues = {}) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    DateHelper.intervals('quarter', startDate, DateHelper.date(endDate)).map((d, index) => (Object.assign({ t: d, x: index, y: 0 }, defaultValues))),
    extractUnit(ts) {
        return DateHelper.date(ts)
            .startOf('quarter')
            .valueOf();
    },
});
export default quarterTemplate;
