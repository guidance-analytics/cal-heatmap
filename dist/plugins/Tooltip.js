var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tooltip_instances, _Tooltip_show, _Tooltip_hide;
import { createPopper } from '@popperjs/core';
const DEFAULT_SELECTOR = '#ch-tooltip';
const defaultOptions = {
    enabled: true,
    // Expecting a function, which will return the tooltip content
    text: (_timestamp, value, dayjsDate) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    `${value} - ${dayjsDate.format('LLLL')}`,
};
const DEFAULT_POPPER_OPTIONS = {
    placement: 'top',
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
};
const virtualElement = {
    getBoundingClientRect(x = 0, y = 0) {
        return {
            width: 0,
            height: 0,
            top: y,
            right: x,
            bottom: y,
            left: x,
            x,
            y,
            toJSON: () => { },
        };
    },
};
export default class Tooltip {
    constructor(calendar) {
        _Tooltip_instances.add(this);
        this.name = 'Tooltip';
        this.calendar = calendar;
        this.root = null;
        this.popperInstance = null;
        this.options = defaultOptions;
        this.listenerAttached = false;
    }
    setup(pluginOptions) {
        this.options = Object.assign(Object.assign({}, defaultOptions), pluginOptions);
        const event = this.calendar.eventEmitter;
        if (!this.options.enabled) {
            if (this.listenerAttached) {
                event.off('mouseover', this.mouseOverCallback, this);
                event.off('mouseout', this.mouseOutCallback, this);
                this.listenerAttached = false;
            }
            this.destroy();
            return;
        }
        this.popperOptions = Object.assign(Object.assign({}, DEFAULT_POPPER_OPTIONS), this.options);
        this.root = document.getElementById(DEFAULT_SELECTOR.slice(1));
        if (!this.root) {
            const tooltipElem = document.createElement('div');
            tooltipElem.setAttribute('id', DEFAULT_SELECTOR.slice(1));
            tooltipElem.setAttribute('role', 'tooltip');
            tooltipElem.innerHTML =
                `<div id="${DEFAULT_SELECTOR.slice(1)}-arrow" data-popper-arrow="true"></div>` +
                    `<span id="${DEFAULT_SELECTOR.slice(1)}-body"></span>`;
            this.root = document.body.appendChild(tooltipElem);
        }
        this.root.setAttribute('data-theme', this.calendar.options.options.theme);
        this.popperInstance = createPopper(virtualElement, this.root, this.popperOptions);
        if (!this.listenerAttached) {
            event.on('mouseover', this.mouseOverCallback, this);
            event.on('mouseout', this.mouseOutCallback, this);
            this.listenerAttached = true;
        }
    }
    mouseOverCallback(e, timestamp, value) {
        __classPrivateFieldGet(this, _Tooltip_instances, "m", _Tooltip_show).call(this, e.target, timestamp, value);
    }
    mouseOutCallback() {
        __classPrivateFieldGet(this, _Tooltip_instances, "m", _Tooltip_hide).call(this);
    }
    // eslint-disable-next-line class-methods-use-this
    paint() {
        return Promise.resolve();
    }
    destroy() {
        if (this.root) {
            this.root.remove();
        }
        return Promise.resolve();
    }
}
_Tooltip_instances = new WeakSet(), _Tooltip_show = function _Tooltip_show(e, timestamp, value) {
    const formatter = this.options.text;
    const title = formatter ?
        formatter(timestamp, value, this.calendar.dateHelper.date(timestamp)) :
        null;
    if (!title) {
        return;
    }
    virtualElement.getBoundingClientRect = () => e.getBoundingClientRect();
    document.getElementById(`${DEFAULT_SELECTOR.slice(1)}-body`).innerHTML =
        title;
    this.popperInstance.setOptions(() => (Object.assign(Object.assign({}, this.popperOptions), { modifiers: [
            ...this.popperOptions.modifiers,
            { name: 'eventListeners', enabled: true },
        ] })));
    this.popperInstance.update();
    this.root.setAttribute('data-show', '1');
}, _Tooltip_hide = function _Tooltip_hide() {
    this.root.removeAttribute('data-show');
    this.popperInstance.setOptions(() => (Object.assign(Object.assign({}, this.popperOptions), { modifiers: [
            ...this.popperOptions.modifiers,
            { name: 'eventListeners', enabled: false },
        ] })));
};
