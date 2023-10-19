/**
 * 深拷贝关注点:
 * 1. JavaScript内置对象的复制: Set、Map、Date、Regex等
 * 2. 循环引用问题
 * @param {*} object
 * @returns
 */
function deepClone(source, memory) {
    let res = null;
    memory || (memory = new WeakMap());
    const isPrimitive = (value) => {
        return /String|Number|Boolean|Null|Undefined|Function|BigInt|Symbol/.test(
            Object.prototype.toString.call(value)
        );
    };
    // 原始数据类型及函数
    if (isPrimitive(source)) {
        console.log("current copy is primitive", source);
        res = source;
    }
    // 数组
    else if (Array.isArray(source)) {
        console.log("current copy is array", source);
        res = source.map(ele => deepClone(ele, memory));
    }
    // 内置对象Date、Regex
    else if (Object.prototype.toString.call(source) === '[object Date]') {
        res = new Date(source);
    } else if (Object.prototype.toString.call(source) === '[object Regex') {
        res = new RegExp(source);
    }
    // 内置对象Set、Map
    else if (Object.prototype.toString.call(source) === '[object Set]') {
        result = new Set();
        source.forEach(ele => {
            result.add(deepClone(ele, memory));
        });
    } else if  (Object.prototype.toString.call(source) === "[object Map]") {
        result = new Map();
        for (const [key, value] of source.entries()) {
          result.set(key, deepClone(value, memory));
        }
    }
    // 引用类型
    else {
        // 循环引用
        if (memory.has(source)) {
            res = memory.get(source);
        } else {
            res = Object.create(null);
            memory.set(source, res);
            Object.keys(source).forEach(key => {
                res[key] = deepClone(source[key], memory);
            });
        };
    };

    return res;
  }