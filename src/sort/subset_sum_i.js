/* 回溯算法：子集和 I */
function backtrack(state, target, choices, start, res) {
    // 子集和等于 target 时，记录解
    if (target == 0) {
        res.push(state)
        return;
    }
    // 遍历所有选择
    // 剪枝二：从 start 开始遍历，避免生成重复子集
    for (let i = start; i < choices.length; i++) {
        // 剪枝一：若子集和超过 target ，则直接结束循环
        // 这是因为数组已排序，后边元素更大，子集和一定超过 target
        if (target - choices[i] < 0) {
            break;
        }
        // 尝试：做出选择，更新 target, start
        state.push(choices[i]);
        // 进行下一轮选择
        backtrack(state, target - choices[i], choices, i, res);
        // 回退：撤销选择，恢复到之前的状态
        state.pop(state.length - 1);
    }
}

/* 求解子集和 I */
function subsetSumI(nums, target) {
    const state = []; 
    Arrays.sort(nums); // 对 nums 进行排序
    let start = 0; // 遍历起始点
    const res = [];
    backtrack(state, target, nums, start, res);
    return res;
}
