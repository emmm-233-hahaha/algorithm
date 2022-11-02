/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let m = matrix.length;
    let n = matrix[0].length;
    let minVal = matrix[0][0];
    let maxVal = matrix[m - 1][n - 1];
    if (target < minVal || target > maxVal) return false;

    // 搜索起点在右上角
    let i = 0;
    let j = n - 1;
    while (i >= 0 && i < m && j >= 0 && j < n) {
        let cur = matrix[i][j];
        if (target === cur) return true;
        if (target > cur) {
            i++; // 目标值大于当前，往下走
        } else {
            j--; //目标值小于当前，往左走
        }
    }

    return false;

}