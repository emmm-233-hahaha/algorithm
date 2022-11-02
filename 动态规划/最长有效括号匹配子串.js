/**
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 */
/**
 * @param {string} s
 * @return {number}
 */
// 求出以每个位置作为结束的时候有效匹配的长度
var longestValidParentheses = function (s) {
    let dp = new Array(s.length);
    dp[0] = 0;
    let maxLen = 0;
    for (let i = 1; i < s.length; i++) {
        let ch = s.charAt(i);
        if (ch === '(') {
            dp[i] = 0
        } else {
            let pre = dp[i - 1];
            let first = i - 1 - pre;
            if (first >= 0) {
                if (s.charAt(first) === ')') dp[i] = 0;
                else {
                    dp[i] = pre + 2;
                    let second = first - 1;
                    if (second > 0) dp[i] += dp[second];
                }
            } else {
                dp[i] = 0
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    console.log(dp);
    return maxLen;
};