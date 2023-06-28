import isEqual from 'lodash-es/isEqual';
function createPlugin(Creator, calendar) {
    return new Creator(calendar);
}
function extractPluginName(PluginClass, options) {
    return `${new PluginClass().name}${(options === null || options === void 0 ? void 0 : options.key) || ''}`;
}
export default class PluginManager {
    constructor(calendar) {
        this.calendar = calendar;
        this.settings = new Map();
        this.plugins = new Map();
        this.pendingPaint = new Set();
    }
    add(plugins) {
        plugins.forEach(([PluginClass, pluginOptions]) => {
            const name = extractPluginName(PluginClass, pluginOptions);
            const existingPlugin = this.plugins.get(name);
            if (existingPlugin &&
                this.settings.get(name) &&
                isEqual(this.settings.get(name).options, pluginOptions)) {
                return;
            }
            this.settings.set(name, {
                options: pluginOptions,
                dirty: true,
            });
            if (!this.plugins.has(name)) {
                this.plugins.set(name, createPlugin(PluginClass, this.calendar));
            }
            this.pendingPaint.add(this.plugins.get(name));
        });
    }
    setupAll() {
        this.plugins.forEach((pluginInstance, name) => {
            const settings = this.settings.get(name);
            if (typeof settings !== 'undefined') {
                if (settings.dirty) {
                    pluginInstance.setup(settings.options);
                    settings.dirty = false;
                    this.settings.set(name, settings);
                }
            }
        });
    }
    paintAll() {
        return Array.from(this.pendingPaint.values()).map((p) => p.paint());
    }
    destroyAll() {
        return this.allPlugins().map((p) => p.destroy());
    }
    getFromPosition(position) {
        return this.allPlugins().filter((plugin) => { var _a; 
        // eslint-disable-next-line implicit-arrow-linebreak
        return ((_a = plugin.options) === null || _a === void 0 ? void 0 : _a.position) === position; });
    }
    getHeightFromPosition(position) {
        return this.getFromPosition(position)
            .map((d) => d.options.dimensions.height)
            .reduce((a, b) => a + b, 0);
    }
    getWidthFromPosition(position) {
        return this.getFromPosition(position)
            .map((d) => d.options.dimensions.width)
            .reduce((a, b) => a + b, 0);
    }
    allPlugins() {
        return Array.from(this.plugins.values());
    }
}
