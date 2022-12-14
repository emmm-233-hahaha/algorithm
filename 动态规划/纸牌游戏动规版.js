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

function cardGame(cards) {
    if (cards.length === 0) return 0;

    return Math.max(first(0, cards.length - 1), second(0, cards.length - 1));

    function first(L, R) {
        if (L === R) return cards[L];
        return Math.max(cards[L] + second(L + 1, R), cards[R] + second(L, R - 1));
    }
    function second(L, R) {
        if (L === R) return 0;
        return Math.min(first(L + 1, R), first(L, R - 1));
    }
}


function cardGame(cards) {
    if (cards.length === 0) return 0;
    let dpFrist = new Array(cards.length)
    for (let index = 0; index < cards.length; index++) {
        dpFrist[index] = new Array(cards.length);

    }
    let dpSecond = new Array(cards.length)
    for (let index = 0; index < cards.length; index++) {
        dpSecond[index] = new Array(cards.length);
    }

    // 对角线赋值
    for (let index = 0; index < cards.length; index++) {
        dpFrist[index][index] = cards[index];
        dpSecond[index][index] = 0;        
    }

    let index = 1
    while (index < cards.length) {
        for (let i = 0, j = i + index; i < cards.length && j < cards.length; i++,j++) {
            dpFrist[i][j] = Math.max(cards[i] + dpSecond[i + 1][j], cards[j] + dpSecond[i][j - 1])
        }

        for (let i = 0, j = i + index; i < cards.length && j < cards.length; i++,j++) {
            dpSecond[i][j] = Math.min(dpFrist[i + 1][j], dpFrist[i][j - 1])
        }
        index++;
    }

    return Math.max(dpFrist[0] [cards.length - 1], dpSecond[0][ cards.length - 1]);
}

console.log(cardGame([1, 2, 100,4]));