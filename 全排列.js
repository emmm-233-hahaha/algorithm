/**
 * 数组中无重复元素的全排列，递归实现
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {

    if (nums.length === 1) return [nums];

    let subnums = nums.slice(0, nums.length - 1);

    let res = permute(subnums) // 前面的元素的全排列
    let last = nums[nums.length - 1];
    let thisres = [];

    for (const item of res) {
        for (let i = 0; i < item.length; i++) {
            let tmp = [...item];
            tmp.splice(i, 0, last);
            thisres.push(tmp);
        }
        thisres.push(item.concat([last]));
    }
    return thisres;

};

console.log(permute([1, 2, 3]));