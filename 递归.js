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
// 对于字符串'abcde'的子序列，可以先得到'abcd'的全部子序列，'abcde'的全部子序列就是'abcd'的全部子序列 并 'abcd'的全部子序列中每一个元素加上字符'e'