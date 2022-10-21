/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
     
    function process(currentRow, currentCol, currentSum) {
        if (currentRow >= m || currentCol >= n) return Infinity;
        if (currentRow === m - 1 && currentCol === n - 1) return currentSum + grid[currentRow][currentCol];


        return Math.min(process(currentRow + 1, currentCol, currentSum + grid[currentRow][currentCol]),
            process(currentRow, currentCol + 1, currentSum + grid[currentRow][currentCol]));
    }

    console.log(process(0, 0, 0));


};


var minPathSum2 = function (grid) { //稍作改写，递归只需要两个参数即可
    let m = grid.length-1;
    let n = grid[0].length-1;

    function process(currentRow, currentCol) {
        if (currentRow === 0 && currentCol === 0) return grid[currentRow][currentCol];
        if (currentRow < 0 || currentCol < 0) return Infinity;

        let p1 = grid[currentRow][currentCol] + process(currentRow - 1, currentCol);//往上走
        let p2 = grid[currentRow][currentCol] + process(currentRow, currentCol - 1);//往右走
        return Math.min(p1, p2);
    }

    console.log(process(m, n, 0));


};



var minPathSum3 = function (grid) { // 二维数组实现动态规划
    let m = grid.length;
    let n = grid[0].length;

    let dp = new Array(grid.length);
    for (let i = 0; i <= m; i++){
        dp[i] = new Array(n + 1);
    }
    dp[0][0] = grid[0][0];

    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            if (i !== 0 || j !== 0) dp[i][j] = grid[i][j] + Math.min(getDpValue(i - 1, j), getDpValue(i, j - 1));
        }
    }
    function getDpValue(r,c) {
        if (r < 0 || c < 0) return Infinity;
        else return dp[r][c];
    }

    console.log(dp[m-1][n-1]);


};

// 优化，用一维数组实现动态规划，例如每次只存储上一行的}dp 值，则可以将空间复杂度优化到 O(n)O(n)。




minPathSum2([[1, 3, 1], [1, 5, 1], [4, 2, 1]]);