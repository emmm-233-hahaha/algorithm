function Node(value) {
    this.val = value;
    this.in = 0;
    this.out = 0;
    this.neighbors = [];
}

/**
 *图的广度优先遍历--队列实现--类似二叉树的层次遍历
 *图中可能存在环，需要一个set结构来避免出现走环
 */
function bfs(root) {
    let queue = [];
    let mySet = new Set();
    mySet.add(root);
    queue.push(root);
    while (queue.length > 0) {
        let curNode = queue.shift();
        console.log(curNode.value)
        for (let item of curNode.neighbors) {
            if (!mySet.has(item)) {
                mySet.add(item);
                queue.push(item);
            }
        }
    }
}

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
// 在bfs的基础上实现克隆一棵树
var cloneGraph = function (node) {
    if (node === null) return null;
    let queue = [];
    let mySet = new Set();
    let myNode = new Node(node.val);
    mySet.add(node);
    queue.push(node);
    let clonequeue = [];
    let cloneMap = new Map();
    cloneMap.set(myNode.val, myNode);
    clonequeue.push(myNode);
    while (queue.length > 0) {
        let curNode = queue.shift();
        let curClone = clonequeue.shift();
        console.log(curNode.val, curClone.val)
        for (let item of curNode.neighbors) {
            if (!mySet.has(item)) {
                let newNode = new Node(item.val);
                curClone.neighbors.push(newNode);
                cloneMap.set(newNode.val, newNode);
                clonequeue.push(newNode);
                mySet.add(item);
                queue.push(item);
            } else {
                curClone.neighbors.push(cloneMap.get(item.val));
            }
        }
    }
    return myNode;
}

/**
 * 图的深度优先遍历--栈实现
 * 深度优先遍历要在压栈之后就对节点做操作而不是弹出才操作
 */
function dfs(root) {
    if (root === null) return;
    let stack = [];
    let set = new Set();
    stack.push(root);
    console.log(root.value)
    set.push(root);
    while (stack.length > 0) {
        let curNode = stack.pop();
        for (let item of curNode.neighbors) {
            if (!set.has(item)) {
                stack.push(curNode); // 回溯的依据
                stack.push(item);
                console.log(item.value);
                set.add(item);
                break;
            }
        }
    }
}

/**
 * 课程表问题
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

//不断循环： 找到入度为0的点，擦去这个点以及与这个点相关的所有边
// 直到图中没有边了
// 

var canFinish = function (numCourses, prerequisites) {
    let nodeList = [];
    // 构造点
    for (let i = 0; i < numCourses; i++) {
        let node = new Node(i);
        nodeList.push(node);
    }
    // 计算每个点的入度
    for (let item of prerequisites) {
        let fromNode = nodeList[item[0]];
        fromNode.out++;
        let toNode = nodeList[item[1]];
        toNode.in++;
        fromNode.neighbors.push(toNode);
    }
    let zeroQueue = [];
    let rmv = [];
    for (let item of nodeList) {
        if (item.in === 0) {
            zeroQueue.push(item);
        }
    }
    while (zeroQueue.length > 0) {
        let zeroNode = zeroQueue.shift();
        rmv.push(zeroNode);
        for (let item of zeroNode.neighbors) {
            item.in--;
            if (item.in === 0) {
                zeroQueue.push(item);
            }
        }
    }
    return nodeList.length === rmv.length;

};