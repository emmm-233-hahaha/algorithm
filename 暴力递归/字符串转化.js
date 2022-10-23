/**
 * https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/submissions/
 * 规定1和A对应、2和B对应、3和C对应...
 * 那么一个数字字符串比如"111"，就可以转化为"AAA"、"KA"和"AK"。
 * 给定一个只有数字字符组成的字符串str，返回有多少种转化结果。
 * */

// 从左到右尝试，如果当前来到i位置，
//  如果i 位置是 0：0无法对应任何字母，0与后面数字结合也无法对应任何字母，返回0
//  如果i 位置是 1：
//          1可以转化成A;
//          1可以结合下一位；
//  如果i 位置是 2：
//           2可以转化为B;
//           2也许可以结合下一位，判断下一位是否大于6
//  如果i 位置 >=3: 那么i位置转为对应字母，i无法结合下一位；递归i +1 即可

function transNum(str) {
    console.log(process(str, 0));

    function process(str, i) {
        if (i === str.length) {
            return 1;
        }
        if ('0' === str.charAt(i)) {
            return 0;
        }
        if ('1' === str.charAt(i)) {
            let res = process(str, i + 1);
            if (i + 1 < str.length) res += process(str, i + 2);
            return res;
        }

        if ('2' === str.charAt(i)) {
            let res = process(str, i + 1);
            if (i + 1 < str.length && str.charAt(i + 1).charCodeAt() < '6'.charCodeAt()) res += process(str, i + 2);
            return res;
        }

        return process(str, i + 1);

    }
}

transNum('111');