// 给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    let eor = 0;
    for (let num of nums) {
        eor = eor ^ num;
    }
    //这时 eor = one ^ other

    let eor2 = 0;
    let rightOne = eor & (~eor + 1); // 能够找到eor低位起的第一个0

    for (let num of nums) {
        if ((rightOne & num) != 0) {
            eor2 = eor2 ^ num;
        }
    }
    return [eor2, eor ^ eor2];
};




/**
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let ans = 0;
    for (let i = 0; i < 32; ++i) { // 计算出答案的每个二进制位
        let total = 0;
        for (const num of nums) {
            let tmp = ((num >> i) & 1); // tmp 是当前遍历到的元素二进制在i上的值
            total += tmp;
        }
        if (total % 3 != 0) {
            ans |= (1 << i);
        }
    }
    return ans;
};