import type Options from './options/Options';
import type { Template, TemplateResult } from './CalHeatmap';
import type DateHelper from './helpers/DateHelper';
export default class TemplateCollection {
    dateHelper: DateHelper;
    options: Options;
    settings: Map<string, TemplateResult>;
    initiated: boolean;
    constructor(dateHelper: DateHelper, options: Options);
    get(subDomainType: string): TemplateResult;
    has(subDomainType: string): boolean;
    init(): void;
    add(templates: Template | Template[]): void;
}
