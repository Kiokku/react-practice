/**
 * Debounces a function to prevent it from being called multiple times within a specified delay.
 *
 * @param {Function} fn - The function to be debounced.
 * @param {number} [delay=500] - The delay in milliseconds before the function is called.
 * @return {Function} - The debounced function.
 */
function debounce(fn, delay = 500, ) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() { 
      // this, event
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
