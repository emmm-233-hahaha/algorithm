/**
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 返回 滑动窗口中的最大值 。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let res = [];
    let window = [];
    let L = 0;
    let R = -1;

    // 先用前K个元素初始化窗口
    for (let i = 0; i < k; i++) {
        rightUpdate(i);
    }
    res.push(nums[window[0]]);


    while (R < nums.length-1) {
        rightUpdate(R + 1);
        leftUpdate(L);
        res.push(nums[window[0]])
    }
    return res;

    function rightUpdate(index) { // 试图入队的元素的下标
        if (window.length === 0) window.push(index);
        else {
            while (nums[window[window.length - 1]] <= nums[index]) {
                window.pop();
                if (window.length === 0) break;
            }
            window.push(index);
        }
       
        R++;
    }

    function leftUpdate(index) { // 试图出队的元素的下标
        if (L === window[0]) window.shift();
        L++;
    }
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))