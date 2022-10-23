// 递归遍历一颗二叉树
function recursive(node) {
    if (node === null) return;
    /*
    第一次访问到某个节点
    如果在这里打印，那么就是先序遍历
     */
    recursive(node.left);
    /*
    第二次访问到某个节点
    如果在这里打印，那么就是中序遍历
    */
    console.log(node.val);
    recursive(node.right);
    /*
    第三次访问到某个节点
    如果在这里打印，那么就是后序遍历
     */
}

// 非递归-先序遍历二叉树-中左右-一栈实现
function preOrder(node) {
    let stack = [];
    stack.push(node);
    while (stack.length > 0) {
        const curNode = stack.pop();
        console.log(curNode.val);
        if (curNode.right !== null) stack.push(curNode.right);
        if (curNode.left !== null) stack.push(curNode.left);
    }
}

// 非递归-后序遍历二叉树-左右中-双栈实现
function posOrder(node) {
    let stack = [];
    stack.push(node);
    let collectStack = [];
    while (stack.length > 0) {
        const curNode = stack.pop();
        collectStack.push(curNode.val);
        if (curNode.left !== null) stack.push(curNode.left);
        if (curNode.right !== null) stack.push(curNode.right);
    }
    while (collectStack.length > 0) {
        console.log(collectStack.pop());
    }
}

// 非递归-中序遍历二叉树-左中右-
function inOrder(root) {
    let stack = [];
    let curNode = root;
    while (stack.length > 0 || curNode !== null) {
        if (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        } else {
            curNode = stack.pop();
            console.log(curNode.val);
            curNode = curNode.right;
        }
    }
}

// 层序遍历二叉树-队列实现
function levelOrder(root) {
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
        let curNode = queue.shift();
        console.log(curNode.val);
        if (curNode.left) queue.push(curNode.left);
        if (curNode.right) queue.push(curNode.right);
    }
};

// 从先序遍历和中序遍历的结果建造二叉树
// 从后序遍历和中序遍历的结果建造二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 前序遍历结果的第一个元素一定是根节点
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) return null;
    const rootVal = preorder[0];
    const inorderIndex = inorder.indexOf(rootVal);
    let root = new TreeNode(rootVal);
    root.left = buildTree(preorder.slice(1, inorderIndex + 1), inorder.slice(0, inorderIndex));
    root.right = buildTree(preorder.slice(inorderIndex + 1), inorder.slice(inorderIndex + 1))
    return root;
};

// 判断一颗树是搜索二叉树 => 中序遍历结果一定是升序的
//1）中序递归遍历判断升序
let preValue1 = -Infinity
function isValidBST1(root) {
    if (root === null) return true;
    let isLeftValidBST = isValidBST(root.left);
    if (!isLeftValidBST) return false;
    if (root.val <= preValue1) return false;
    else {
        preValue1 = root.val;
    }
    return isValidBST(root.right);
};

function isValidBST2(root) {
    let preValue = -Infinity
    let stack = [];
    let curNode = root;
    while (stack.length > 0 || curNode !== null) {
        if (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        } else {
            curNode = stack.pop();
            if (curNode.val <= preValue) return false;
            else { preValue = curNode.val; }
            curNode = curNode.right;
        }
    }
    return true;
};