

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var getMaxMatrix = function (matrix) {
    let res = [];
    let finalMax = -Infinity;
    let m = matrix.length;
    let n = matrix[0].length;

    for (let i = 0; i < m; i++) { // 起始行
        let compressed = new Array(n).fill(0);
        for (let j = i; j < m; j++) { // 终止行
            for (let k = 0; k < n; k++) {
                compressed[k] += matrix[j][k];
            }

            let cur = compressed[0] >= 0 ? compressed[0] : 0;
            let max = compressed[0];
            let start = 0;
            let end = 0;
            let newstart = compressed[0] >= 0 ? 0 : 1;
            for (let y = 1; y < n; y++) {
                cur += compressed[y];
                if (cur > max) {
                    start = newstart
                    end = y;
                    max = cur;
                }
                if (cur < 0) {
                    newstart = y + 1;
                    cur = 0;
                }
            }

            if (max > finalMax) {
                finalMax = max;
                res = [i, start, j, end];
            }
        }
    }


    return res;

};


console.log(getMaxMatrix([[-5, -4, -3], [-3, -1, -6]]));