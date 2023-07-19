/* 元素交换 */
function swap(nums, i, j) {
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}

/* 哨兵划分 */
function partition(nums, left, right) {
    // 以 nums[left] 作为基准数
    let i = left,
        j = right;
    while (i < j) {
        while (i < j && nums[j] >= nums[left]) {
            j -= 1; // 从右向左找首个小于基准数的元素
        }
        while (i < j && nums[i] <= nums[left]) {
            i += 1; // 从左向右找首个大于基准数的元素
        }
        // 元素交换
        this.swap(nums, i, j); // 交换这两个元素
    }
    this.swap(nums, i, left); // 将基准数交换至两子数组的分界线
    return i; // 返回基准数的索引
}

/* 快速排序 */
function quickSort(nums, left, right) {
    // 子数组长度为 1 时终止递归
    if (left >= right) return;
    // 哨兵划分
    const pivot = this.partition(nums, left, right);
    // 递归左子数组、右子数组
    this.quickSort(nums, left, pivot - 1);
    this.quickSort(nums, pivot + 1, right);
}

/* 快速排序（尾递归优化） */
function quickSortOptimized(nums, left, right) {
    // 子数组长度为 1 时终止
    while (left < right) {
        // 哨兵划分操作
        let pivot = this.partition(nums, left, right);
        // 对两个子数组中较短的那个执行快排
        if (pivot - left < right - pivot) {
            this.quickSort(nums, left, pivot - 1); // 递归排序左子数组
            left = pivot + 1; // 剩余未排序区间为 [pivot + 1, right]
        } else {
            this.quickSort(nums, pivot + 1, right); // 递归排序右子数组
            right = pivot - 1; // 剩余未排序区间为 [left, pivot - 1]
        }
    }
}
