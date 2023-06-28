import castArray from 'lodash-es/castArray';
import isFunction from 'lodash-es/isFunction';
import isString from 'lodash-es/isString';
export default {
    range: (value) => Math.max(+value, 1),
    'date.highlight': (args) => castArray(args),
    'subDomain.label': (value) => 
    // eslint-disable-next-line
    ((isString(value) && value !== '') || isFunction(value) ? value : null),
};
