// Manacher算法解决的问题：给定字符串中最长回文子串的长度？ O(N)
//      1.如果遍历字符串中的每一个字符，以当前字符作为对称轴，同时往两边发散，能够扩出的最长长度就是当前的回文串长度
//          这种做法只能找到长度为奇数的回文串，并且复杂度为O(N^2)
//      2.如果在每个字符之间包括头前尾后都插入一个特殊字符，在遍历新的字符串就能同时找到奇偶回文串
//      3.在2.的基础上，可以计算每一个字符的回文半径，生成一个回文半径数组，那么字符串中的最长回文长度就可以在数组里面找到
//          回文半径数组后一个元素的值可以由前一个计算得到，从而降低复杂度

function manacher(str) {
    let res = 1;
    let myStr = insertSpecial(str);
    let radiusArr = new Array(myStr.length);
    radiusArr[0] = 1;
    let R = 0;
    let C = 0;
    for (let i = 1; i < myStr.length; i++) {
        if (i >= R) { // 当前遍历到的点不在R的范围中，从i开始向两边扩散,必会更新R和C
            C = i;
            let r = i + 1;
            let l = i - 1;
            while (l >= 0 && r < myStr.length) {
                if (myStr.charAt(l) === myStr.charAt(r)) {
                    r++;
                    l--;
                } else {
                    break;
                }
            }
            radiusArr[i] = r - i;
            R = r - 1;
        } else {
            let L = C - (R - C);
            let imageI = C - (i - C); // i的镜像点i
            let radius_imageI = radiusArr[imageI]; // 镜像点的回文半径
            if ((imageI - radius_imageI + 1) > L) {
                radiusArr[i] = radiusArr[imageI];
            } else if ((imageI - radius_imageI + 1) < L) {
                radiusArr[i] = R - i +1;
            } else {
                let r = R + 1;
                let l = i - (r - i);
                while (l >= 0 && r < myStr.length) {
                    if (myStr.charAt(l) === myStr.charAt(r)) {
                        r++;
                        l--;
                    } else {
                        break;
                    }
                }
                radiusArr[i] = r - i;
                if (r - 1 > R) {
                    R = r - 1;
                    C = i;
                }
            }
        }
    }

    return radiusArr;

}

function insertSpecial(str) {
    let special = '#';
    let strArr = str.split('').map(item => item + special).join('');
    return special + strArr;
}

console.log(manacher('babadada'));