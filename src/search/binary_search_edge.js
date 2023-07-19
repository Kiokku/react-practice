/* 二分查找最左一个元素 */
function binarySearchLeftEdge(nums, target) {
    let i = 0,
        j = nums.length - 1; // 初始化双闭区间 [0, n-1]
    while (i <= j) {
        let m = Math.floor((i + j) / 2); // 计算中点索引 m
        if (nums[m] < target) {
            i = m + 1; // target 在区间 [m+1, j] 中
        } else if (nums[m] > target) {
            j = m - 1; // target 在区间 [i, m-1] 中
        } else {
            j = m - 1; // 首个小于 target 的元素在区间 [i, m-1] 中
        }
    }
    if (i == nums.length || nums[i] != target) {
        return -1; // 未找到目标元素，返回 -1
    }
    return i;
}
