/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue = undefined) {
    const paths = path
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/\["(\w+)"\]/g, '.$1')
        .replace(/\['(\w+)'\]/g, '.$1')
        .split('.');
    let result = object;
    for (p of paths) {
        result = result?.[p];
    };
    return result === undefined ? defaultValue : result;
}