/**
 * 给定一个整型数组arr，代表数值不同的纸牌排成一条线。玩家A和玩家B依次拿走每张纸牌，规定玩家A先拿，玩家B后拿，
 * 但是每个玩家每次只能拿走最左或最右的纸牌，玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。
 */
/**
 * 【举例】
arr=[1,2,100,4]。
开始时，玩家A只能拿走1或4。如果开始时玩家A拿走1，则排列变为[2,100,4]，
接下来玩家 B可以拿走2或4，然后继续轮到玩家A...

如果开始时玩家A拿走4，则排列变为[1,2,100]，
接下来玩家B可以拿走1或100，然后继续轮到玩家A...

玩家A作为绝顶聪明的人不会先拿4，因为拿4之后，玩家B将拿走100。所以玩家A会先拿1，让排列变为[2,100,4]，
接下来玩家B不管怎么选，100都会被玩家 A拿走。玩家A会获胜，分数为101。所以返回101。

arr=[1,100,2]。
开始时，玩家A不管拿1还是2，玩家B作为绝顶聪明的人，都会把100拿走。玩家B会获胜，分数为100。所以返回100
 */

/**
 * 
 * @param {Array(number)} arr 
 */
function cardGame(arr) {
    if (arr.length === 0) return0;
    return Math.max(first(arr, 0, arr.length),second(arr, 0, arr.length));
    function first(arr, L, R) { // 先手函数
        if (L === R) {
            return arr[L];
        }

        let leftres = arr[L] + second(arr, L + 1, R);
        let rightres = arr[R] + second(arr, L, R - 1);
        return Math.max(leftres, rightres);
    }

    function second(arr, L, R) { // 后手函数
        if (L === R) return 0;

        let leftres = first(arr, L + 1, R);
        let rightres = first(arr, L, R - 1);

        return Math.min(leftres, rightres);
    }
}

console.log(cardGame([1, 2, 100, 4]));