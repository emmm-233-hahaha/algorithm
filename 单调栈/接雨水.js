/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let len = height.length;
    if (len <= 2) return 0;
    let rightMax = height[len - 1];
    let leftMax = height[0];
    let rightPtr = len - 2;
    let leftPtr = 1;
    let total = 0;

    while (leftPtr <= rightPtr) {
        let left = height[leftPtr];
        let right = height[rightPtr];

        if (leftMax < rightMax) { // 瓶颈出现在左边
            total += Math.max(0, leftMax - left);
            leftMax = Math.max(left, leftMax);
            leftPtr++;
        } else { // 瓶颈出现在右边
            total += Math.max(0, rightMax - right);
            rightMax = Math.max(right, rightMax);
            rightPtr--;
        }
    }

    return total;
};