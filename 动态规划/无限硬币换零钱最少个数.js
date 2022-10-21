/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的。
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    console.log(process(0, amount));

    function process(index, rest) {

        if (index === coins.length) {
            if (rest === 0) {
                return 0;
            } else {
                return -1;
            }
        }
        if (rest === 0) {
            return 0;
        }

        let min = Infinity;
        for (let i = 0; coins[index] * i <= rest; i++) {
            let tmp = process(index + 1, rest - coins[index] * i);
            if (tmp !== -1) {
                min = Math.min(min, tmp + i)
            }
        }
        return min;

    }
}

var coinChange2 = function (coins, amount) {
    let dp = new Array(coins.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(amount + 1).fill(Infinity);
    }
    process(0, amount)
    console.log(dp[0][amount]);
    function process(index, rest) {
        if (dp[index][rest] !== Infinity) return dp[index][rest];
        if (rest === 0) {
            dp[index][rest] = 0;
        } else if (index === coins.length) {
            dp[index][rest] = -1;
        } else {
            let min = Infinity;
            for (let i = 0; coins[index] * i <= rest; i++) {
                let tmp = process(index + 1, rest - coins[index] * i);
                if (tmp !== -1) {
                    min = Math.min(min, tmp + i)
                }
            }
            dp[index][rest] = min;
        }

        return dp[index][rest];

    }
}


var coinChange3 = function (coins, amount) {
    let dp = new Array(coins.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(amount + 1).fill(Infinity);
    }

    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 0;
    }
    for (let i = 1; i <= amount + 1; i++) {
        dp[coins.length][i] = Infinity;
    }

    for (let i = coins.length - 1; i >= 0; i--) {
        for (let j = 1; j <= amount; j++) {
            for (let num = 0; coins[i] * num <= j; num++) {
                let tmp = dp[i + 1][j - coins[i] * num];
                dp[i][j] = Math.min(dp[i][j], tmp + num)
            }
        }
    }



    console.log(dp[0][amount]);
}

// 另一种递归思路，如果从现在手里有amount开始，每次要拿走一枚硬币，怎么样拿走才能使次数最少？
var coinChange4 = function (coins, amount) {
    console.log(process(amount));
    function process(rest) {
        if (rest === 0) return 0
        let num = Infinity;
        for (let i = 0; i < coins.length; i++) {
            if (coins[i] <= rest) {
                num = Math.min(num, process(rest - coins[i]) + 1)
            }
        }
        return num;
    }
}


var coinChange5 = function (coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++){
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }

    console.log(dp[amount]);
}


coinChange5([411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864);
//coinChange5([1,3,5], 11);
