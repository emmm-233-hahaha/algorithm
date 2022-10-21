/**
 * 给定一个数组arr,数组中可能含有重复值，数组中的元素代表现有的硬币
 * 给定一个目标值aim,输出组成aim的方法数
 * 例如arr = 【2，7，3，5，3】代表现在有五枚硬币，面值分别是2 7 3 5 3
 * aim = 10 ,要组成aim ,有几种方式？
 */
/**
 * 这个问题等价于，找到arr的某个子序列，子序列之和为aim
 */

function minimalCoin(arr,aim) {
    console.log(process(0, 0));
    /**
     * 暴力解法，每一个位置都有选或不选两种情况
     * @param {*} i 表示当前来到了i 位置
     * @param {*} currentAmount 之前已经选好的硬币的总和
     */
    function process(i, currentAmount) {
        if (i === arr.length) {
            if (currentAmount === aim) {
                return 1;
            } else return 0;
        }

        return process(i + 1, currentAmount + arr[i]) + process(i + 1, currentAmount) 
    }
}

minimalCoin([2, 7, 3, 5, 3], 10);

