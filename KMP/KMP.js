// 给你两个字符串 haystack 和 needle ，
// 请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
// 如果 needle 不是 haystack 的一部分，则返回 - 1 。
/**
 * 暴力解法，尝试haystack中以每一个字符开始的字符串能否匹配needle
 * 复杂度O(N*M) N为haystack长度，M为needle长度
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr1 = function (haystack, needle) {
    if (needle.length > haystack.length) return -1;
    let haystackPtr = 0;
    let needlePtr = 0;
    let res = 0;
    while (haystackPtr < haystack.length) {
        if (haystack.charAt(haystackPtr) === needle.charAt(needlePtr)) {
            haystackPtr++;
            needlePtr++
            while (needlePtr < needle.length) {
                if (haystack.charAt(haystackPtr) === needle.charAt(needlePtr)) {
                    haystackPtr++;
                    needlePtr++;
                } else {
                    break;
                }
            }
            if (needlePtr === needle.length) {
                res = haystackPtr - needle.length;
                return res;
            } else {
                haystackPtr = haystackPtr - needlePtr + 1;
                needlePtr = 0;
            }
        } else {
            haystackPtr++;
        }
    }
    return -1;
};

// Kmp算法
// 复杂度O(N + M) N为haystack长度，M为needle长度
var strStr = function (haystack, needle) {
    if (needle.length > haystack.length) return -1;
    let nextArr = getNextArray(needle);
    let i1 = 0; // haystack中的指针
    let i2 = 0; // neddle 中的指针
    while (i1 < haystack.length && i2 < needle.length) {
        if (haystack.charAt(i1) === needle.charAt(i2)) {
            i1++;
            i2++
        } else { // 遇到不相等时
            if (nextArr[i2] !== -1) {
                i2 = nextArr[i2]
            } else {
                i1++;
            }
        }
    }
    if (i2 === needle.length) {
        return i1 - i2;
    } else {
        return -1;
    }

};
// needle字符串在i位置处的字符 之前的子串中，前缀与后缀相等的最大长度
// 求解nextarr数组
// nextArr[0] = -1; 人为规定
// nextArr[1] = 0;  人为规定
// nextArr[2] = needle.charAt(0) === needle.charAt(1) ? 1:0 ;简单比较前两位即可
// 假设来到 i 位置 若要计算nextArr[i] 则需要next[i -1]的值
function getNextArray(needle) {
    let nextArr = new Array(needle.length);
    nextArr[0] = -1;
    nextArr[1] = 0;
    nextArr[2] = needle.charAt(0) === needle.charAt(1) ? 1 : 0;
    let i = 2;
    let cn = nextArr[i - 1]; // 要拿哪个index的字符 与 当前位置的前一个字符作比较
    while (i < needle.length) {
        if (needle.charAt(cn) === needle.charAt(i - 1)) {
            nextArr[i] = cn + 1;
            cn = nextArr[i]
            i++;
        } else {
            if (cn > 0) { // 继续循环往前找
                cn = nextArr[cn];
            } else { // 无法继续寻找
                nextArr[i] = 0;
                cn = nextArr[i];
                i++;
            }
        }
    }
    return nextArr;
}
console.log(strStr('abbstabbecabbstabbs', 'abbstabbs'));