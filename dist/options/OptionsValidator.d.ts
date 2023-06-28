import type TemplateCollection from '../TemplateCollection';
import type { DomainOptions, SubDomainOptions, DataOptions } from './Options';
/**
 * Ensure that critical options are valid
 *
 * @throw {Error} on critical invalid options
 * @return {boolean} Returns true when there is not critical errors
 */
export default function validate(templateCollection: TemplateCollection, { domain, subDomain, data, }: {
    domain: Partial<DomainOptions>;
    subDomain: Partial<SubDomainOptions>;
    data: Partial<DataOptions>;
}): boolean;
