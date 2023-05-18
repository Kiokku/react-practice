/** 遍历数组 */
function traverse(arr) {
  // 通过索引遍历数组
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  // 通过 for...of 遍历数组
  for (let item of arr) {
    console.log(item);
  }
}

/* 在数组中查找指定元素 */
function find(nums, target) {
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] == target) return i;
  }
  return -1;
}

