const ALLOWED_DATA_TYPES = ['json', 'csv', 'tsv', 'txt'];
/**
 * Ensure that critical options are valid
 *
 * @throw {Error} on critical invalid options
 * @return {boolean} Returns true when there is not critical errors
 */
export default function validate(templateCollection, { domain, subDomain, data, }) {
    const domainType = domain.type;
    const subDomainType = subDomain.type;
    if (!templateCollection.has(domainType)) {
        throw new Error(`'${domainType}' is not a valid domain type'`);
    }
    if (!templateCollection.has(subDomainType)) {
        throw new Error(`'${subDomainType}' is not a valid subDomain type'`);
    }
    if (data.type && !ALLOWED_DATA_TYPES.includes(data.type)) {
        throw new Error(`The data type '${data.type}' is not valid data type`);
    }
    if (!(templateCollection.get(subDomainType).allowedDomainType || []).includes(domainType)) {
        throw new Error(`The subDomain.type '${subDomainType}' can not be used together ` +
            `with the domain type ${domainType}`);
    }
    return true;
}
