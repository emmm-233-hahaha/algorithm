/**
 * 实现一个感染函数，双重循环每遍历到一个1,res++,并把这一片岛感染
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let M = grid.length; // 矩阵的行数
    let N = grid[0].length; // 矩阵的列数

    function infect(i, j) { // 把值为1的元素及其上下左右全部 感染 成2
        if (i < 0 || j < 0 || i >= M || j >= N || grid[i][j] === "2" || grid[i][j] === "0") {
            // 如果如果当前元素已经被感染||当前元素是水||当前位置越界
            return;
        }
        grid[i][j] = "2"; // 感染自己
        infect(i + 1, j);
        infect(i - 1, j);
        infect(i, j + 1);
        infect(i, j - 1); // 递归感染上下左右
    }

    let res = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === "1") {
                res++;
                infect(i, j);
            }
        }
    }
    return res;
};

/**
 * 岛问题二，如何判断一篇区域是被围绕的？？？
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    let M = board.length;
    let N = board[0].length;


    function infect(i, j) {
        if (i < 0 || j < 0 || i >= M || j >= N || board[i][j] !== 'O') {
            return
        }
        board[i][j] = '#';
        infect(i + 1, j);
        infect(i - 1, j);
        infect(i, j + 1);
        infect(i, j - 1);
    }
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (i === 0 || j === 0 || i === M - 1 || j === N - 1) {
                if (board[i][j] === 'O') {
                    infect(i, j);
                }
            }
        }
    }
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === "O") {
                board[i][j] = 'X';
            }
            if (board[i][j] === "#") {
                board[i][j] = 'O';
            }
        }
    }
};


/**
 *还是需要感染，只不过每一次感染，面积都要加一
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    let M = grid.length; // 矩阵的行数
    let N = grid[0].length; // 矩阵的列数

    function infect(i, j) { // 把值为1的元素及其上下左右全部 感染 成2
        if (i < 0 || j < 0 || i >= M || j >= N || grid[i][j] === 2 || grid[i][j] === 0) {
            // 如果如果当前元素已经被感染||当前元素是水||当前位置越界
            return 0;
        }
        let area = 0;
        grid[i][j] = 2; // 感染自己
        area++;
        // 递归感染上下左右
        return area + infect(i + 1, j) + infect(i - 1, j) + infect(i, j + 1) + infect(i, j - 1);
    }

    let res = 0;
    let maxArea = 0
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === 1) {
                res++;
                maxArea = Math.max(infect(i, j, 0), maxArea)
            }
        }
    }
    return maxArea;
};


/**
 * 计算一座岛的周长
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
    let M = grid.length; // 矩阵的行数
    let N = grid[0].length; // 矩阵的列数

    function infect(i, j) { // 把值为1的元素及其上下左右全部 感染 成2
        if (i < 0 || j < 0 || i >= M || j >= N || grid[i][j] === 2 || grid[i][j] === 0) {
            // 如果如果当前元素已经被感染||当前元素是水||当前位置越界
            return 0;
        }
        let zhouchang = 0;
        grid[i][j] = 2; // 感染自己

        // 计算周长
        //判断上方
        if (i === 0 || grid[i - 1][j] === 0) {
            zhouchang++
        }
        // 判断下方
        if (i === M - 1 || grid[i + 1][j] === 0) {
            zhouchang++
        }
        // 左
        if (j === 0 || grid[i][j - 1] === 0) {
            zhouchang++
        }
        if (j === N - 1 || grid[i][j + 1] === 0) {
            zhouchang++
        }
        // 递归感染上下左右
        return zhouchang + infect(i + 1, j) + infect(i - 1, j) + infect(i, j + 1) + infect(i, j - 1);
    }

    let tital = 0
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === 1) {
                total = infect(i, j);
                break; // 因为恰好只有一片岛屿
            }
        }
    }
    return total;
};