/**
 * 实现一个 compose 函数，进行函数合成，比如 redux 中的 compose，react 高阶组件连续调用时的 compose
 */
function compose(...fns) {
    return fns.reduce(
        (pre, fn) =>
            (...args) =>
                fn(pre(...args))
    )
}