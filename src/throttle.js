/**
 * Throttles the execution of a function.
 *
 * @param {function} fn - The function to be throttled.
 * @param {number} delay - The delay in milliseconds.
 * @return {function} - The throttled function.
 */
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}