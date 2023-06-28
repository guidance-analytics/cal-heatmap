// @ts-ignore
import { scale } from '@observablehq/plot';
import { SCALE_BASE_OPACITY_COLOR } from './constant';
export function normalizedScale(scaleOptions) {
    try {
        const scaleType = Object.keys(scaleOptions)[0];
        return scale({
            [scaleType]: Object.assign(Object.assign({}, scaleOptions[scaleType]), { clamp: true }),
        });
    }
    catch (error) {
        return null;
    }
}
function scaleStyle(_scale, scaleOptions) {
    const styles = {};
    if (scaleOptions.hasOwnProperty('opacity')) {
        styles.fill = () => 
        // eslint-disable-next-line implicit-arrow-linebreak
        scaleOptions.opacity.baseColor || SCALE_BASE_OPACITY_COLOR;
        styles['fill-opacity'] = (d) => _scale === null || _scale === void 0 ? void 0 : _scale.apply(d);
    }
    else {
        styles.fill = (d) => 
        // eslint-disable-next-line implicit-arrow-linebreak
        (typeof d === 'string' && (d === null || d === void 0 ? void 0 : d.startsWith('#')) ? d : _scale === null || _scale === void 0 ? void 0 : _scale.apply(d));
    }
    return styles;
}
export function applyScaleStyle(elem, _scale, scaleOptions, keyname) {
    Object.entries(scaleStyle(_scale, scaleOptions)).forEach(([prop, val]) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    elem.style(prop, (d) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    val(keyname ? d[keyname] : d)));
}
