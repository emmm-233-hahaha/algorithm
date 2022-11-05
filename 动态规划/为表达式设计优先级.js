/**
 * @param {string} expression
 * @return {number[]}
 */

// 所有运算符的下标都是基数，所有操作数的下标都是偶数
var diffWaysToCompute = function (expression) {
    let res = [];
    let expArr = [];
    let index = 0; sfbdf
    while (index < expression.length) {
        if (expression.charAt(index) <= 9 && expression.charAt(index) >= 0) {
            let tmp = expression.charAt(index);
            index++;
            while (index < expression.length && expression.charAt(index) <= 9 && expression.charAt(index) >= 0) {
                tmp += expression.charAt(index);
                index++;
            }
            expArr.push(parseInt(tmp));
        } else {
            expArr.push(expression.charAt(index));
            index++;
        }
    }

    console.log(process(0, expArr.length - 1))
    function process(start, end) {
        if (start === end) {
            return [expArr[start]];
        }
        let tmp = [];
        for (let i = start + 1; i < end; i += 2) {
            let left = process(start, i - 1);
            let right = process(i + 1, end)

            for (let l = 0; l < left.length; l++) {
                for (let r = 0; r < right.length; r++) {
                    tmp.push(calculate(left[l], right[r], expArr[i]));
                }
            }
        }
        return tmp;
    }
};

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '*':
            return num1 * num2;
        case '-':
            return num1 - num2;
    }
}

var diffWaysToCompute2 = function (expression) {
    let expArr = [];
    let index = 0; 5
    while (index < expression.length) {
        if (expression.charAt(index) <= 9 && expression.charAt(index) >= 0) {
            let tmp = expression.charAt(index);
            index++;
            while (index < expression.length && expression.charAt(index) <= 9 && expression.charAt(index) >= 0) {
                tmp += expression.charAt(index);
                index++;
            }
            expArr.push(parseInt(tmp));
        } else {
            expArr.push(expression.charAt(index));
            index++;
        }
    }

    let dp = new Array(expArr.length)
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(expArr.length)
    }

    for (let i = 0; i < dp.length; i += 2) {
        dp[i][i] = [expArr[i]];
    }

    for (let dis = 2; dis < dp.length; dis+=2) {
        for (let start = 0; start+ dis < dp.length; start += 2) {
            let end = start + dis;
            let tmp = [];
            for (let i = start + 1; i < end; i += 2) {
                let left = dp[start][i - 1];
                let right = dp[i + 1][end];
                for (let l = 0; l < left.length; l++) {
                    for (let r = 0; r < right.length; r++) {
                        tmp.push(calculate(left[l], right[r], expArr[i]));
                    }
                }
            }
            dp[start][end] = tmp;
        }
    }


    console.log(dp[0][expArr.length - 1]);
};


diffWaysToCompute2('2*3-4*5');