/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {

    let dp = new Array(word1.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(word2.length + 1);
    }

    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = i; //纯删除
    }

    for (let j = 0; j < dp[0].length; j++) {
        dp[0][j] = j; //纯插入
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j]);
            dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i][j]);
        }
    }

    return dp[word1.length][word2.length]
};
