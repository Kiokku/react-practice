var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();

// babel 转换后
// var data = [];
//
// var _loop = function _loop(i) {
//     data[i] = function () {
//         console.log(i);
//     };
// };
//
// for (var i = 0; i < 3; i++) {
//     _loop(i);
// }
//
// data[0]();
// data[1]();
// data[2]();

