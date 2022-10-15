/**
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成
 * 暴力解法，在字符串的前一半，挨个构造前缀，如果当前前缀的长度能够被字符串整除那就尝试将当前长度重复x次看看是否与s相等，直到找到相等。
 * KMP解法 找到字符串s的最长相等前后缀，判断最长相等前后缀与字符串的长度关系
 * 
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    if (s.length === 1) return false;
    if (s.length === 2) return s.charAt(0) === s.charAt(1)
    let nextArr = getNextArr(s);
    console.log(nextArr);
    const maxlen = nextArr[s.length];
    if (maxlen * 2 === s.length || (maxlen * 2 > s.length && (s.length % (maxlen - (maxlen * 2 - s.length)) === 0))) {
        return true;
    } else {
        return false;
    }
};

function getNextArr(s) {
    let len = s.length;
    let nextArr = new Array(len + 1);
    nextArr[0] = -1;
    nextArr[1] = 0;
    let index = 2;
    let cn = nextArr[index - 1];
    while (index <= len) {
        if (s.charAt(cn) === s.charAt(index - 1)) {
            nextArr[index] = cn + 1;
            cn = nextArr[index]
            index++;
        } else if (cn > 0) {
            cn = nextArr[cn];
        } else {
            nextArr[index] = 0;
            index++;
        }
    }

    return nextArr;
}


/**
 * 给定两个字符串 a 和 b，寻找重复叠加字符串 a 的最小次数，使得字符串 b 成为叠加后的字符串 a 的子串，如果不存在则返回 -1。
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const repeatedStringMatch = (a, b) => {
    const an = a.length, bn = b.length;
    const index = strStr(a, b); // b在a中第一次出现的下标
    if (index === -1) {
        return -1;
    }
    if (an - index >= bn) {
        return 1;
    }
    if (index === 0) {
        return Math.ceil(bn / an)
    }
    return Math.ceil((bn + index - an) / an) + 1;
}

const strStr = (a, b) => {
    const n = a.length, m = b.length;
    if (m === 0) {
        return 0;
    }

    const nextArr = getNextArr(b);

    // 返回b在叠加的a中第一次出现的下标

    let i = 0; // 模拟叠加后a的指针
    let j = 0; // b的指针
    while (i < m + n) { // 如果在i=2n时，叠加的a中依然找不到b那么就算再接着叠加也不会找到的 
        if (a.charAt(i % n) === b.charAt(j)) {
            i++;
            j++;
        } else {
            if (nextArr[j] !== -1) j = nextArr[j];
            else i++;
        }
        if (j === m) {
            return i - m;
        }
    }

    return -1;


}

console.log(repeatedStringMatch('abcde', 'abcdea'));