const yearTemplate = (DateHelper) => {
    const ALLOWED_DOMAIN_TYPE = [];
    return {
        name: 'year',
        allowedDomainType: ALLOWED_DOMAIN_TYPE,
        rowsCount: () => 1,
        columnsCount: () => 1,
        mapping: (startTimestamp, endTimestamp) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        DateHelper.intervals('year', startTimestamp, DateHelper.date(endTimestamp)).map((ts, index) => ({
            t: ts,
            x: index,
            y: 0,
        })),
        extractUnit: (ts) => DateHelper.date(ts).startOf('year').valueOf(),
    };
};
export default yearTemplate;
