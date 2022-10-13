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