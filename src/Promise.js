// Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
const promise = new Promise(function (resolve, reject) {
  /**
   * resolve(value) or
   * reject(error)
   */
});

function Promise(executor) {
  var self = this;
  self.status = "pending";
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === "pending") {
        self.status === "resolved";
        self.data = value;
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === "pending") {
        self.status = "rejected";
        self.data = reason;
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    });
  }

  // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
  try {
    executor(resolve, reject);
  } catch (error) {
    throw reject(error);
  }
}

/*
resolvePromise函数即为根据x的值来决定promise2的状态的函数
也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
`resolve`和`reject`实际上是`promise2`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来。
相信各位一定可以对照标准把标准转换成代码，这里就只标出代码在标准中对应的位置，只在必要的地方做一些解释
*/
function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise2 === x) {
    // 对应标准2.3.1节
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }

  if (x instanceof Promise) {
    // 对应标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === "pending") {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject);
    }
    return;
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 2.3.3
    try {
      // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 即要判断它的类型，又要调用它，这就是两次读取
      then = x.then;
      if (typeof then === "function") {
        // 2.3.3.3
        then.call(
          x,
          function rs(y) {
            // 2.3.3.3.1
            if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true;
            return resolvePromise(promise2, y, resolve, reject); // 2.3.3.3.1
          },
          function rj(r) {
            // 2.3.3.3.2
            if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        // 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // 2.3.3.2
      if (thenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    // 2.3.4
    resolve(x);
  }
}
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (reason) {
          throw reason;
        };

  if (self.status === "resolved") {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 异步执行onResolved
        try {
          var x = onResolved(self.data);
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          // 否则，以它的返回值做为promise2的结果
          resolve(x);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.status === "rejected") {
    return (promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      })
    }));
  }

  if (self.status === "pending") {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

// catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function(fn) {
  // 为什么这里可以呢，因为所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的。
  // 当然这里只能保证在已添加的函数里是最后一次，不过这也是必然。
  // 不过看起来比其它的实现要简单以及容易理解的多。
  // 貌似对finally的行为没有一个公认的定义，所以这个实现目前是跟Q保持一致，会返回一个新的Promise而不是原来那个。
  return this.then(function(v){
    setTimeout(fn)
    return v
  }, function(r){
    setTimeout(fn)
    throw r
  })
}

Promise.prototype.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues = new Array(promiseNum)
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

Promise.prototype.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function(value) {
        return resolve(value)
      }, function(reason) {
        return reject(reason)
      })
    }
  })
}
