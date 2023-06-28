import { Position } from '../constant';
export function isHorizontal(position) {
    return position === 'left' || position === 'right';
}
export function isVertical(position) {
    return position === 'top' || position === 'bottom';
}
export function horizontalPadding(padding) {
    return padding[Position.LEFT] + padding[Position.RIGHT];
}
export function verticalPadding(padding) {
    return padding[Position.TOP] + padding[Position.BOTTOM];
}
