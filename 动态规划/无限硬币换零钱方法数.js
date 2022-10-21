/**
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
 * 假设每一种面额的硬币有无限个。
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {

    return process(0, amount);
    function process(index, rest) { // 暴力递归 当前位置取0张，1张，2张，。。。
        if (index === coins.length) {
            if (rest === 0) {
                return 1;
            } else {
                return 0;
            }
        }
        if (rest === 0) {
            return 1;
        }

        let num = 0;
        for (let i = 0; coins[index] * i <= rest; i++) {
            num += process(index + 1, rest - coins[index] * i)
        }
        return num;
    }
};

var change1 = function (amount, coins) {

    let dp = new Array(coins.length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(amount + 1).fill(-1);
    }
    process(0, amount)
    return dp[0][amount];
    function process(index, rest) { // 记忆化搜索
        if (dp[index][rest] !== -1) return dp[index][rest];
        if (index === coins.length) {
            if (rest === 0) {
                dp[index][rest] = 1;
            } else {
                dp[index][rest] = 0;
            }
        } else if (rest === 0) {
            dp[index][rest] = 1;
        } else {
            dp[index][rest] = 0;
            for (let i = 0; coins[index] * i <= rest; i++) {
                dp[index][rest] += process(index + 1, rest - coins[index] * i)
            }
        }

        return dp[index][rest];
    }
};

var change3 = function (amount, coins) {

    let dp = new Array(coins.length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(amount + 1).fill(-1);
    }

    // 严格表结构的动态规划


    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 1;
    }
    for (let i = 1; i < amount + 1; i++) {
        dp[coins.length][i] = 0;
    }

    for (let i = coins.length - 1; i >= 0; i--) {
        for (let j = 1; j < amount + 1; j++) {
            dp[i][j] = 0;
            let num = 0;
            while (coins[i] * num <= j) {
                dp[i][j] += dp[i + 1][j - coins[i] * num];
                num++;
            }
        }
    }
    return dp[0][amount];
};

var change4 = function (amount, coins) {

    let dp = new Array(coins.length + 1);

    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(amount + 1).fill(-1);
    }

    // 优化严格表结构的动态规划，观察依赖的计算能否简化


    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 1;
    }
    for (let i = 1; i < amount + 1; i++) {
        dp[coins.length][i] = 0;
    }

    for (let i = coins.length - 1; i >= 0; i--) {
        for (let j = 1; j < amount + 1; j++) {
            dp[i][j] = 0;
            dp[i][j] += dp[i + 1][j];
            if (j - coins[i] >= 0) {
                dp[i][j] += dp[i][j - coins[i]]
            }
        }
    }
    return dp[0][amount];
};

let amount = 5, coins = [1, 2, 5];
console.log(change4(amount, coins));