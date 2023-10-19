import isDeepEqual from './isDeepEqual';


function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
/**
 * The base implementation of `isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function isEqual(value, other) {
    // -0 and 0 are equivalent.
    // 1 / +0 is equal Infinity, 1 / -0 is equal -Infinity.
    if (value === other) return value !== 0 || 1 / value === 1 / other;
    // If either value is null or undefined, or if neither value is an object. 
    // If any of these conditions are true, it checks if both values are NaN and returns true if they are. 
    // Otherwise, it returns false.
    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
    };

    return isDeepEqual(value, other);
}

export default isEqual;