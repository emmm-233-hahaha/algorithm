/**
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    if (n < 1) return
    var res = [];
    let record = new Array(n) // 一个一维数组，记录皇后的位置，record[i] = j 代表第i 行的皇后放在了第j列
    process(n, 0, record, res);
    console.log(res);
}

function process(n, i, record, res) {
    if (i === n) {
        res.push(deal(record));
        return;
    } //来到了终止行，当前record 已经是一种解法了
    for (let j = 0; j < n; j++) { // 逐个尝试第i行的每个位置看看是否合法
        if (isValid(i, j, record)) {
            record[i] = j;
            process(n, i + 1, record, res);
        }
    }
}
/**
 * 
 * @param {*} i 
 * @param {*} j 
 * @param {*} record 
 */
function isValid(i, j, record) {
    for (let row = 0; row <= i - 1; row++) {
        let col = record[row];
        if (col == j || Math.abs((j - col) / (i - row)) === 1) {
            return false
        }
    }
    return true;
}
/**
 * 把当前record处理成答案
 * @param {*} record 
 */
function deal(record) {
    let ret = [];
    for (let i = 0; i < record.length; i++) {
        let position = record[i];
        let line = new Array(record.length).fill('.');
        line[position] = 'Q';
        ret.push(line.join(''));
    }
    // console.log(ret);
    return ret;
}

// solveNQueens(4);



/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
// 汉诺塔问题递归
var hanota = function (A, B, C) {
    function move(i, from, to, other) {
        if (i === 1) {
            // console.log( 'move '+i+' from: '+ from+' to: '+to);
            to.push(from.pop());

        } else {
            move(i - 1, from, other, to);
            // console.log( 'move '+i+' from: '+ from+' to: '+to);
            to.push(from.pop());
            move(i - 1, other, to, from);
        }
    }
    let n = A.length;
    move(n, A, C, B);
};


// 打印一个字符串的全部子序列，包括空字符串
// 对于字符串中的每一位字符，都有add or not 两种情况，假设字符串长度是n，则一共2^n个子序列
// 经典做法，从左往右，每个字符要 或 不要 做决策
function printAllSubsquences(s) {
    let subStr = '';
    processSub(0, s, subStr);
}

function processSub(i, s, subStr) { // 当前来到第i个字符，判断
    if (i === s.length) {
        console.log(subStr);
        return;
    }
    processSub(i + 1, s, subStr + s.charAt(i));
    processSub(i + 1, s, subStr)

}

// printAllSubsquences('abcde');


// 对于字符串'abcde'的子序列，可以先得到'abcd'的全部子序列，'abcde'的全部子序列就是'abcd'的全部子序列 并 'abcd'的全部子序列中每一个元素加上字符'e'



/**
 * 给定两个长度都为N的数组weights和values，weights[i]和values[i]分别代表i号物品的重量和价值。
 * 给定一个正数bag，表示一个载重bag的袋子，你装的物品不能超过这个重量。返回你能装下最多的价值是多少？
 */
/**
 * 
 * @param {number[]} weights 
 * @param {number[]} values 
 * @param {number} bag 
 */
function getMaxWeight(weights, values, bag) {
    console.log(processBag(0, 0, 0));
    function processBag(i, currentWeight, currentValue) {
        if (currentWeight > bag) {
            return 0;
        } else if (currentWeight === bag || i === values.length) {
            return currentValue;
        }

        return Math.max(
            processBag(i + 1, currentWeight + weights[i], currentValue + values[i]),
            processBag(i + 1, currentWeight, currentValue)
        )
    }

}

getMaxWeight([3, 2, 4, 7], [5, 6, 3, 19], 11);