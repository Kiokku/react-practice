import isEqual from "./isEqual";

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const regexTag = '[object RegExp]';
const stringTag = '[object String]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const booleanTag = '[object Boolean]';

function isDeepEqual(value, other) {
    const valueTag = toString.call(value);
    const otherTag = toString.call(other);

    if (valueTag !== otherTag) return false;

    // is regex,String,Number,Date,Boolean
    switch (valueTag) {
        case regexTag:
        case stringTag:
            return '' + a === '' + b;
        case numberTag:
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case dateTag:
        case booleanTag:
            return +a === +b;
    };

    // is Array
    if (valueTag === arrayTag) {
        const length = value.length;
        if (length != other.length) return false;
        while (length--) {
            if (!isEqual(value[length], other[length])) return false;
        };
        return true;
    }
    // is Object
    else {
        const keys = Object.keys(value);
        const keysLength = keys.length;
        if (keysLength !== Object.keys(other).length) return false;
        while (keysLength--) {
            const key = keys[keysLength];
            if (!hasOwnProperty.call(other, key) || !isEqual(value[key], other[key])) return false;
        };
        return true;
    }
}