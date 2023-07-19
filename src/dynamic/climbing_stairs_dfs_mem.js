/* 搜索 */
function dfs(i, mem) {
    // 已知 dp[1] 和 dp[2] ，返回之
    if (i == 1 || i == 2)
        return i;
    // dp[i] = dp[i-1] + dp[i-2]
    if (mem[i] != -1) {
        return mem[i];
    }
    const count = dfs(i - 1, mem) + dfs(i - 2, mem);
    mem[i] = count;
    return count;

}

/* 爬楼梯：搜索 */
function climbingStairsDFS(n) {
    const mem = Array(n+1).fill(-1);
    return dfs(n, mem);
}
