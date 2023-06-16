/* 二分查找（双闭区间） */
function binarySearch(nums, target) {
    // 初始化双闭区间 [0, n-1] ，即 i, j 分别指向数组首元素、尾元素
    let i = 0,
        j = nums.length - 1;
    // 循环，当搜索区间为空时跳出（当 i > j 时为空）
    while (i <= j) {
        // 计算中点索引 m ，使用 parseInt() 向下取整
        // 也可以用Math.floor()
        const m = parseInt(i + (j - i) / 2);
        if (nums[m] < target)
            // 此情况说明 target 在区间 [m+1, j] 中
            i = m + 1;
        else if (nums[m] > target)
            // 此情况说明 target 在区间 [i, m-1] 中
            j = m - 1;
        else return m; // 找到目标元素，返回其索引
    }
    // 未找到目标元素，返回 -1
    return -1;
}

/* 二分查找（左闭右开） */
function binarySearchLCRO(nums, target) {
    // 初始化左闭右开 [0, n) ，即 i, j 分别指向数组首元素、尾元素+1
    let i = 0,
        j = nums.length;
    // 循环，当搜索区间为空时跳出（当 i = j 时为空）
    while (i < j) {
        // 计算中点索引 m ，使用 parseInt() 向下取整
        const m = parseInt(i + (j - i) / 2);
        if (nums[m] < target)
            // 此情况说明 target 在区间 [m+1, j) 中
            i = m + 1;
        else if (nums[m] > target)
            // 此情况说明 target 在区间 [i, m) 中
            j = m;
        // 找到目标元素，返回其索引
        else return m;
    }
    // 未找到目标元素，返回 -1
    return -1;
}
