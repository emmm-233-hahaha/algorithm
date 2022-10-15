/**
 * 数组中无重复元素的全排列，递归实现
 *方法1. [1,2,3]的全排列 = 把3插到[1，2]的全排列的不同位置去 = [3,1,2] [1,3,2] [1,2,3]
 *方法2. 固定一个开头，让剩下的位置进行全排列，第一个位置有n种可能性，第二个位置有n-1可能性
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

var permute2 = function (nums) {
    let res = [];
    process(0, nums);
    function process(index, nums) {
        if (index === nums.length) {
            res.push(Array.from(nums));
            return;
        }
        for (let i = index; i < nums.length; i++) {
            swap(index, i, nums);
            process(index + 1, nums);
            swap(index, i, nums);
        }
    }
    function swap(i, j, arr) {
        if (i === j) return;
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return res;
}

/**
 * 若数组中含有重复的元素，如何让全排列互相不重复？？
 * 在方法2的基础上，利用一个Map记录元素是否已经尝试过
 * 分支限界
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    let res = [];
    process(0, nums);
    function process(index, nums) {
        if (index === nums.length) {
            res.push(Array.from(nums));
            return;
        }
        let set = new Set();
        for (let i = index; i < nums.length; i++) {
            if (!set.has(nums[i])) {
                set.add(nums[i]);
                swap(index, i, nums);
                process(index + 1, nums);
                swap(index, i, nums);
            }
        }
    }
    function swap(i, j, arr) {
        if (i !== j) {
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }

    return res;
};

console.log(permuteUnique([1, 2, 2]));