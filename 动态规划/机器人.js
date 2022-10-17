/**
 * 机器人想要从S到达E，机器人每一步可以随意网左走或右走长度为1，不能停在原地，求从S到达E的所有走法
 * 例如N = 5, S = 2, E = 4, K = 4
 * 机器人有 4 种走法: 2=>3=>4=>5=>4; 2=>3=>4=>3=>4; 2=>1=>2=>3=>4; 2=>3=>2=>3=>4;
 * 
 * 尝试思路：
 * 
 * @param {number} N 机器人可以行走的路径
 * @param {*} S 机器人的开始位置 1<S<N
 * @param {*} E 机器人的目的位置 1<E<N
 * @param {*} K 机器人只能走K步
 */
function getRobotWalkWays(N, S, E, K) {
    console.log(process(S, K));
    /**
     * 暴力递归尝试，走到每一位置都尝试左走和右走两种方式，返回两种走法的答案之和
     * 时间复杂度 高度为K的二叉树 O(2^K)
     * @param {*} cur 当前机器人走到哪里了
     * @param {*} rest  机器人还能走几步
     */
    function process(cur, rest) {
        if (rest === 0) {
            if (cur === E) return 1;
            else return 0;
        }

        let num = 0;
        if (cur + 1 <= N) num = process(cur + 1, rest - 1);
        if (cur - 1 >= 1) num += process(cur - 1, rest - 1);
        return num;
    }
}



function getRobotWalkWays2(N, S, E, K) {
    let dp = new Array(K + 1) //开一个二维表
    for (let i = 0; i < K + 1; i++){
        dp[i] = new Array(N + 1).fill(-1);
    }
    console.log(process(S, K));
    /**
     * 动态规划,记忆化搜索,虽然还是在递归但是已经不用重复计算了
     * 记忆化搜索不管状态之间的依赖关系谁先谁后，只看状态是否重复出现
     * 时间复杂度 dp表的规模O(K*N)
     * @param {*} cur 当前机器人走到哪里了
     * @param {*} rest  机器人还能走几步
     */
    function process(cur, rest) {
        if (dp[rest][cur] !== -1) { // 当前状态已经计算过，直接返回缓存值
            return dp[rest][cur];
        }

        /**
         * 缓存未命中的情况
         */
        if (rest === 0) {
            if (cur === E) {
                dp[rest][cur] = 1;
            } else {
                dp[rest][cur] = 0;
            }

        } else {
            let num = 0;
            if (cur + 1 <= N) num = process(cur + 1, rest - 1);
            if (cur - 1 >= 1) num += process(cur - 1, rest - 1);
            dp[rest][cur] = num;
        }
        return dp[rest][cur];
    }
}

function getRobotWalkWays3(N, S, E, K) {
    let dp = new Array(K + 1) //开一个二维表
    for (let i = 0; i < K + 1; i++) {
        dp[i] = new Array(N + 1).fill(-1);
    }
    /**
     * 根据递归中的basecase先初始化一部分dp表
     * rest = 0 时 dp[rest][cur] = 0 or 1
     */

    for (let j = 1; j <= N; j++){
        if (j === E) dp[0][j] = 1;
        else dp[0][j] = 0;
    }

    /**
     * 根据递归分析先后依赖关系，要得到dp[i][j]  必须先得到左上角dp[i-1][j-1] 右上角dp[i-1][j+1]
     * 总之下一行依赖上一行，先计算小行
    */
    
    for (let i = 1; i <= K; i++){
        for (let j = 1; j <= N; j++){
            if (j === 1) dp[i][j] = dp[i - 1][j + 1];
            else if (j === N) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = dp[i - 1][j + 1] + dp[i - 1][j - 1]
        }
    }

    return dp[K][S];
}

console.log(getRobotWalkWays3(5, 2, 4, 4));