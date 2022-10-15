



/**
 *这里有 n 门不同的在线课程，按从 1 到 n 编号。给你一个数组 courses ，其中 courses[i] = [durationi, lastDayi] 表示第 i 门课将会 持续 上 durationi 天课，并且必须在不晚于 lastDayi 的时候完成。
 *你的学期从第 1 天开始。且不能同时修读两门及两门以上的课程。
 *返回你最多可以修读的课程数目。
 * @param {number[][]} courses
 * @return {number}
 */

// 贪心策略，优先考虑结束时间最早的课程
// 已经决定修读的课程用优先队列存放，可以后悔！！！！！！！
var scheduleCourse = function (courses) {
    function compareFn(course1, course2) {
        if (course1[1] > course2[1]) return 1
        else { return -1 };
    }
    function compareDuration(course1, course2) {
        if (course1[0] < course2[0]) return 1
        else { return -1 };
    }
    courses.sort(compareFn);
    let res = []; // 这是一个优先级队列/大根堆
    let startDay = 0;
    for (let course of courses) {
        if (course[0] <= course[1]) {
            if (startDay + course[0] <= course[1]) {
                res.push(course);
                res.sort(compareDuration)
                startDay = startDay + course[0]
            } else {
                if (course[0] < res[0][0]) {
                    startDay -= (res[0][0] - course[0]);
                    res[0] = course;
                    res.sort(compareDuration)
                }
            }
        }
    }

    return res.length;

};

/**
 * 如果将一根金条切成两部分，需要花费的代价与金条的长度一样
 * 一群人想要整份整块金条，怎么分代价最小？
 * 例如，给定数组[10,20,30],代表一共三个人，金条总长度为10+20+30=60
 * 金条要分成10,20,30三个部分。 如果先把长度60的金条分成10和50，花费60；再把长度50的金条分成20和30，花费50；一共花费110铜板。
 * 但是如果先把长度60的金条分成30和30，花费60；再把长度30金条分成10和20，花费30；一共花费90铜板。
 * 输入一个数组，返回分割的最小代价。
 * 哈夫曼编码&&小根堆解决
 */

function leastSplitCost(arr) {
    arr.sort((a, b) => a - b); // 将数组视为一个小根堆;
    let sum = 0;
    let cur = 0;
    while (arr.length > 0) {
        cur = arr.shift() + arr.shift(); // 每次从小根堆里弹出两个元素计算和
        sum += cur;
        arr.push(cur); // 将这个和放到小根堆里面去
        arr.sort((a, b) => a - b);
    }
    console.log(arr);
}
console.log(leastSplitCost([2, 3, 4, 7, 9, 2]));

/**
 * 输入v正数数组costs；正数数组profits；正数k；正数m
 * 含义：costs[i]表示i号项目的花费；profits[i]表示i号项目在扣除花费之后还能挣到的钱(利润)；
 * k表示你只能串行的最多做k个项目；m表示你初始的资金
 * 例如costs = [3,1,4,9,9]; profits = [1,2,3,7,4]; M =1 ; K = 4
 * 依次做 index= 1,0,2三个项目后，获得最大利润为7
 * 说明：你每做完一个项目，马上获得的收益，可以支持你去做下一个项目。
 * 输出：你最后获得的最大钱数。
 */
// 思路：用小根堆按cost存放项目，用大根堆按profit存放当前能够解锁的项目


