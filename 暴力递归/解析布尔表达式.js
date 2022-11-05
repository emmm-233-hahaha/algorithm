/**
 * @param {string} expression
 * @return {boolean}
 */
// 递归写法
var parseBoolExpr = function (expression) {

    return process(expression);

    function process(exp) {
        if (exp === 't') {
            return true;
        }
        if (exp === 'f') {
            return false
        }

        let op = exp.charAt(0);
        let len = exp.length;
        let inner = exp.substring(2, len - 1);
        if (op === '!') {
            return !process(inner);
        } else if (op === '&') {
            let inners = firstLayersplit(inner);
            let res = process(inners[0]);
            for (let i = 1; i < inners.length; i++) {
                res = res && process(inners[i]);
            }
            return res;
        } else {
            let inners = firstLayersplit(inner);
            let res = process(inners[0]);
            for (let i = 1; i < inners.length; i++) {
                res = res || process(inners[i]);
            }
            return res;
        }
    }
};


function firstLayersplit(str) {
    let exps = [];
    let start = 0;
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '(') counter++;
        else if (str.charAt(i) === ')') counter--;
        else if (str.charAt(i) === ',') {
            if (counter === 0) {
                exps.push(str.substring(start, i))
                start = i + 1;
            }
        }
    }

    exps.push(str.substring(start))

    return exps;
}

// 栈写法
var parseBoolExpr2 = function (expression) {
    let len = expression.length;
    let stack = [];

    for (let i = 0; i < len; i++) {
        let cur = expression.charAt(i);
        if (cur === ',') continue;
        else if (cur === ')') {
            let tmp = [];
            let ele = stack.pop();
            while (ele !== '(') {
                tmp.push(ele);
                ele = stack.pop();
            }
            let op = stack.pop();
            stack.push(cal(op, tmp))
        } else {
            stack.push(cur);
        }
    }

    return stack[0] === 't' ? true : false;
};

function cal(op, eles) {
    let res = '';
    switch (op) {
        case '!':
            res = eles[0] === 't' ? 'f' : 't';
            break;
        case '&':
            res = eles[0];
            for (let i = 1; i < eles.length; i++) {
                if (res === 't' && eles[i] === 't') {
                    res = 't';
                } else {
                    res = 'f';
                }
            }
            break;
        case '|':
            res = eles[0];
            for (let i = 1; i <= eles.length; i++) {
                if (res === 't' || eles[i] === 't') {
                    res = 't';
                } else {
                    res = 'f';
                }
            }
            break;
        default:
            break;
    }
    return res;
}



console.log(parseBoolExpr2("&(t,t,t)"))