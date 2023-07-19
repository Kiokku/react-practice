/* 回溯算法：子集和 I */
function backtrack(state, target, total, choices, res = []) {
    // 子集和等于 target 时，记录解
    if (total === target) {
        res.push(state);
        return;
    }
    // 遍历所有选择
    for (let i = 0; i < choices.length; i++) {
        // 剪枝：若子集和超过 target ，则跳过该选择
        if (total + choices[i] > target) {
            continue;
        }
        // 尝试：做出选择，更新元素和 total
        state.push(choices[i]);
        // 进行下一轮选择
        backtrack(state, target, total + choices[i], choices, res);
        // 回退：撤销选择，恢复到之前的状态
        state.pop(state.length - 1);
    }
}

/* 求解子集和 I（包含重复子集） */
function subsetSumINaive(nums, target) {
    const state = []; // 状态（子集）
    let total = 0; // 子集和
    const res = []; // 结果列表（子集列表）
    backtrack(state, target, total, nums, res);
    return res;
}