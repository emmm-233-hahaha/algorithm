/**
 * 逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。
 * 平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
 * 该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
 * 逆波兰表达式主要有以下两个优点：
 * 去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
 * 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    function calculate(operator, num1, num2) {
        let res = 0;
        switch (operator) {
            case '+':
                res = num1 + num2;
                break;
            case '-':
                res = num1 - num2;
                break;
            case '*':
                res = num1 * num2;
                break;
            case '/':
                res = parseInt(num1 / num2);
                break;
            default:
                break;
        }
        return res;
    }
    let stack = [];
    for (let element of tokens) {
        if (element.charAt(element.length - 1) >= 0 && element.charAt(element.length - 1) <= 9) {
            stack.push(element - 0);
        } else {
            let op1 = stack.pop();
            let op2 = stack.pop();
            let tmpRes = calculate(element, op2, op1);
            stack.push(tmpRes);
        }
    }

    return stack[0];
};

/**
 * 
 * @param {2.从左向右顺序获取中缀表达式
a.数字直接输出
b.运算符
情况一：遇到左括号直接入栈，遇到右括号将栈中左括号之后入栈的运算符全部弹栈输出，同时左括号出栈但是不输出。
情况二：遇到乘号和除号  弹出栈顶的乘除之后 直接入栈，直到遇到优先级比它更低的运算符，依次弹栈。
情况三：遇到加号和减号，如果此时栈空，则直接入栈，否则，将栈中优先级高的运算符依次弹栈（注意：加号和减号属于同一个优先级，所以也依次弹栈）直到栈空或则遇到左括号为止，停止弹栈。（因为左括号要匹配右括号时才弹出）。
情况四：获取完后，将栈中剩余的运算符号依次弹栈输出
 */
function in2pos(inStr) {
    let opStack = [];
    let posStack = [];
    let index = 0;
    while (index < inStr.length) {
        let char = inStr.charAt(index);
        if (char >= 0 && char <= 9) {
            let num = char;
            index++;
            while (inStr.charAt(index) >= 0 && inStr.charAt(index) <= 9 && index < inStr.length) {
                num += (inStr.charAt(index) - 0);
                index++;
            }
            posStack.push(num);
        } else {
            index++;
            if (char === '(') { // 遇到左括号直接入栈
                opStack.push(char);
            } else if (char === ')') { // 遇到右括号 就把与自己匹配的左括号之间的运算符弹出
                while (opStack[opStack.length - 1] !== '(') {
                    posStack.push(opStack.pop());
                }
                opStack.pop();
            } else if (char === '*' || char === '/') { // 遇到高优先级 把优先级相同的全部弹出

                while ((opStack[opStack.length - 1] === '/' || opStack[opStack.length - 1] === '*') && opStack.length > 0) {
                    posStack.push(opStack.pop());
                }
                opStack.push(char);
            }
            else {
                while (opStack[opStack.length - 1] !== '(' && opStack.length > 0) { // 遇到低优先级运算符 要将 >= 自己的全部弹出 然后把自己入栈
                    posStack.push(opStack.pop());
                }
                opStack.push(char);
            }
        }
    }

    while (opStack.length > 0) {
        posStack.push(opStack.pop());
    }


    return posStack;
}

var calculate = function (s) {
    s = s.split(' ').join(''); //删除空格
    for (let i = 0; i < s.length; i++) { // 处理字符串，-xxx 变成 0-xxx
        let c = s.charAt(i);
        if (i === 0 && c === '-') {
            s = '0' + s;
            i++;
        }
        if (c === '-' && s.charAt(i - 1) === '(') {
            s = s.substring(0, i) + '0' + s.substring(i)
            i++
        }
    }
    const posArr = in2pos(s);
    const res = evalRPN(posArr);
    return res;
};

console.log(calculate('1+2+(0-2*(3+4)+9)'));