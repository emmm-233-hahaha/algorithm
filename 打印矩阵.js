// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {

    let res = [];
    function clockwise(row1, col1, row2, col2) {
        for (let i = col1; i <= col2; i++) {
            res.push(matrix[row1][i]);
        }
        for (let i = row1 + 1; i <= row2; i++) {
            res.push(matrix[i][col2]);
        }
        for (let i = col2 - 1; i >= col1 && row1 < row2; i--) {
            res.push(matrix[row2][i])
        }

        for (let i = row2 - 1; i > row1 && col1 < col2; i--) {
            res.push(matrix[i][col1]);
        }
    }

    let i = 0; j = 0; m = matrix.length - 1; n = matrix[0].length - 1;

    while (i <= m && j <= n) {
        clockwise(i, j, m, n);
        i++;
        j++;
        m--;
        n--;
    }

    return res;

};

console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))