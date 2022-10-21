/**
 * 在一个 n x n 的国际象棋棋盘上，一个骑士从单元格(row, column) 开始，并尝试进行 k 次移动。行和列是 从 0 开始 的，所以左上单元格是(0, 0) ，右下单元格是(n - 1, n - 1) 。
 * 象棋骑士有8种可能的走法，如下图所示。每次移动在基本方向上是两个单元格，然后在正交方向上是一个单元格。
 * 每次骑士要移动时，它都会随机从8种可能的移动中选择一种(即使棋子会离开棋盘)，然后移动到那里。
 * 骑士继续移动，直到它走了 k 步或离开了棋盘。
 * 返回 骑士在棋盘停止移动后仍留在棋盘上的概率 。
 */
// 概率 = 没有出棋盘的方法数 / 总的方法数

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function (n, k, row, column) {
    let all = Math.pow(8, k);
    let nums = process(row, column, k);
    console.log(nums / all);
    function process(row, column, rest) { //返回所有可能的走法数量
        if (row >= n || column >= n || row < 0 || column < 0) return 0;
        else if (rest === 0) return 1;
        else {
            let num = 0;
            num += process(row - 2, column - 1, rest - 1);
            num += process(row - 2, column + 1, rest - 1);
            num += process(row + 1, column - 2, rest - 1);
            num += process(row - 1, column - 2, rest - 1);
            num += process(row + 2, column + 1, rest - 1);
            num += process(row + 2, column - 1, rest - 1);
            num += process(row + 1, column + 2, rest - 1);
            num += process(row - 1, column + 2, rest - 1);
            return num;
        }
    }
};


var knightProbability2 = function (n, k, row, column) {

    function getDpValue(r, c, h) {
        if (r >= n || c >= n || r < 0 || c < 0) return 0;
        else return dp[r][c][h];
    }

    let all = Math.pow(8, k);

    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = new Array(k + 1).fill(0);
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j][0] = 1
        }
    }
    for (let m = 1; m <= k; m++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                dp[i][j][m] += getDpValue(i - 2, j - 1, m - 1);
                dp[i][j][m] += getDpValue(i - 2, j + 1, m - 1);
                dp[i][j][m] += getDpValue(i + 1, j - 2, m - 1);
                dp[i][j][m] += getDpValue(i - 1, j - 2, m - 1);
                dp[i][j][m] += getDpValue(i + 2, j + 1, m - 1);
                dp[i][j][m] += getDpValue(i + 2, j - 1, m - 1);
                dp[i][j][m] += getDpValue(i + 1, j + 2, m - 1);
                dp[i][j][m] += getDpValue(i - 1, j + 2, m - 1);
            }
        }
    }


    let nums = getDpValue(row, column, k);
    console.log(nums / all);
};


let n = 3, k = 2, row = 0, column = 0
knightProbability2(n, k, row, column);