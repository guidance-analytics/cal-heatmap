import castArray from 'lodash-es/castArray';
import DefaultTemplates from './templates/index';
export default class TemplateCollection {
    constructor(dateHelper, options) {
        this.settings = new Map();
        this.dateHelper = dateHelper;
        this.options = options;
        this.initiated = false;
    }
    get(subDomainType) {
        return this.settings.get(subDomainType);
    }
    has(subDomainType) {
        return this.settings.has(subDomainType);
    }
    init() {
        if (!this.initiated) {
            this.initiated = true;
            this.add(DefaultTemplates);
        }
    }
    add(templates) {
        this.init();
        const tplWithParent = [];
        castArray(templates).forEach((f) => {
            const template = f(this.dateHelper, this.options.options);
            this.settings.set(template.name, template);
            if (template.hasOwnProperty('parent')) {
                tplWithParent.push(template.name);
            }
        });
        tplWithParent.forEach((name) => {
            const parentTemplate = this.settings.get(this.settings.get(name).parent);
            if (!parentTemplate) {
                return;
            }
            this.settings.set(name, Object.assign(Object.assign({}, parentTemplate), this.settings.get(name)));
        });
    }
}
