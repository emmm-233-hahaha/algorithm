/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays1 = function (nums, target) {
    return process(0, target);
    function process(i, rest) {
        if (i === nums.length) {
            if (rest === 0) return 1;
            else return 0;
        }
        let res = process(i + 1, rest + nums[i])
        res += process(i + 1, rest - nums[i])
        return res;
    }
};


var findTargetSumWays = function (nums, target) {
    let bigSum = 0
    for (let num of nums) {
        bigSum += Math.abs(num);
    }
    if (target > bigSum || target < -bigSum) return 0;
    let positiveDp = new Array(nums.length + 1)
    for (let i = 0; i < positiveDp.length; i++) {
        positiveDp[i] = new Array(bigSum + 1);
    }

    let negetiveDp = new Array(nums.length + 1)
    for (let i = 0; i < positiveDp.length; i++) {
        negetiveDp[i] = new Array(bigSum + 1);
    }

    positiveDp[nums.length][0] = 1;
    negetiveDp[nums.length][0] = 1;
    for (i = 1; i <= bigSum; i++) {
        positiveDp[nums.length][i] = 0;
        negetiveDp[nums.length][i] = 0;
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = 0; j <= bigSum; j++) {
            positiveDp[i][j] = getValue(i + 1, j + nums[i]);
            positiveDp[i][j] += getValue(i + 1, j - nums[i]);
            negetiveDp[i][j] = getValue(i + 1, -j + nums[i]);
            negetiveDp[i][j] += getValue(i + 1, -j - nums[i]);
        }
    }

    function getValue(row, col) {
        if (col > bigSum || col < -bigSum) return 0;
        if (col >= 0) return positiveDp[row][col];
        else return negetiveDp[row][-col];


    }

    if (target >= 0) {
        return positiveDp[0][target];
    }
    return negetiveDp[0][-target];
};



console.log(findTargetSumWays([1], -1));