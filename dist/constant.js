export var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["SCROLL_NONE"] = 0] = "SCROLL_NONE";
    ScrollDirection[ScrollDirection["SCROLL_BACKWARD"] = 1] = "SCROLL_BACKWARD";
    ScrollDirection[ScrollDirection["SCROLL_FORWARD"] = 2] = "SCROLL_FORWARD";
})(ScrollDirection || (ScrollDirection = {}));
export var Position;
(function (Position) {
    Position[Position["TOP"] = 0] = "TOP";
    Position[Position["RIGHT"] = 1] = "RIGHT";
    Position[Position["BOTTOM"] = 2] = "BOTTOM";
    Position[Position["LEFT"] = 3] = "LEFT";
})(Position || (Position = {}));
export const OPTIONS_DEFAULT_DOMAIN_TYPE = 'hour';
export const OPTIONS_DEFAULT_SUBDOMAIN_TYPE = 'minute';
export const OPTIONS_DEFAULT_SUBDOMAIN_WIDTH = 10;
export const OPTIONS_DEFAULT_SUBDOMAIN_HEIGHT = 10;
export const OPTIONS_DEFAULT_SUBDOMAIN_GUTTER = 2;
export const OPTIONS_DEFAULT_SUBDOMAIN_RADIUS = 0;
export const OPTIONS_DEFAULT_ANIMATION_DURATION = 200;
export const OPTIONS_DEFAULT_RANGE = 12;
export const OPTIONS_DEFAULT_ITEM_SELECTOR = '#cal-heatmap';
export const OPTIONS_DEFAULT_THEME = 'light';
export const OPTIONS_DEFAULT_LOCALE = 'en';
export const SCALE_BASE_OPACITY_COLOR = 'red';
export const SCALE_BASE_COLOR_SCHEME = 'YlOrBr';
export const SCALE_BASE_COLOR_TYPE = 'quantize';
export const SCALE_BASE_COLOR_DOMAIN = [0, 100];
