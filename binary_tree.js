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

// 一颗树是搜索二叉树 => 中序遍历结果一定是升序的
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


// 二叉树的递归套路1.如何判断一棵树是否是搜索二叉树？
// 左子树是二叉搜索树
// 右子树是二叉搜索树
// 左子树上的最大值 < 根节点 < 右子树的最小值
/* interface returnInfo {
    maxValue: number;
    minValue: number;
    isBst: boolean;
} */
var isValidBST = function (root) {
    let rootData = bstDp(root);
    return rootData.isBst;
};

function bstDp(root) {
    if (root === null) return null;
    let leftData = bstDp(root.left);
    let rightData = bstDp(root.right);
    let minValue = root.val;
    let maxValue = root.val;
    let isBst = false;
    if (leftData) {
        minValue = Math.min(minValue, leftData.minValue)
        maxValue = Math.max(maxValue, leftData.maxValue)
    }
    if (rightData) {
        minValue = Math.min(minValue, rightData.minValue);
        maxValue = Math.max(maxValue, rightData.maxValue);
    }
    if (leftData && leftData.isBst && leftData.maxValue < root.val && rightData && rightData.isBst && rightData.minValue > root.val) {
        isBst = true;
    } else if (leftData === null && rightData && rightData.isBst && rightData.minValue > root.val) {
        isBst = true;
    } else if (rightData === null && leftData && leftData.isBst && leftData.maxValue < root.val) {
        isBst = true;
    } else if (leftData === null && rightData === null) {
        isBst = true;
    }
    return {
        maxValue,
        minValue,
        isBst,
    }
}

// 树的递归套路2.如何判断平衡二叉树
// 左子树是平衡二叉树
// 右子树是平衡二叉树
// 左右树高度差<=1
/*
interface returnInfo {
    isBal: boolean;
    height: number;
}
 */
var isBalanced = function (root) {
    let rootData = judgeDp(root);
    return rootData.isBal;
};

function judgeDp(root) {
    if (root === null) {
        return { isBal: true, height: 0 }
    }
    let leftData = judgeDp(root.left);
    let rightData = judgeDp(root.right);

    let height = Math.max(leftData.height, rightData.height) + 1;
    let isBal = false;
    if (leftData.isBal && rightData.isBal && Math.abs((leftData.height - rightData.height)) <= 1) {
        isBal = true;
    }
    return {
        isBal,
        height
    }
}


// 寻找一棵树上两个不同节点p,q的最近公共祖先
// 方法1. 遍历树，生成fatherMap（记录每个节点与父亲的一一对应关系）
//        => 根据fatherMap得到节点p的祖先集合
//        => 不断循环q的祖先，若第一次出现某个祖先出现在q的祖先链上，则这个祖先是最近公共祖先
var lowestCommonAncestor = function (root, p, q) {
    let queue = [];
    let fatherMap = new Map();
    let curNode = root;
    queue.push(curNode);
    fatherMap.set(root, root);
    while (queue.length > 0) {
        curNode = queue.shift();
        if (curNode.left) {
            queue.push(curNode.left);
            fatherMap.set(curNode.left, curNode);
        }
        if (curNode.right) {
            queue.push(curNode.right);
            fatherMap.set(curNode.right, curNode);
        }
    }
    let pAncestorsSet = new Set();
    pAncestorsSet.add(root);
    pAncestorsSet.add(p);
    let findVal = p
    while (fatherMap.get(findVal) !== findVal) {
        pAncestorsSet.add(fatherMap.get(findVal));
        findVal = fatherMap.get(findVal);
    }
    let qVal = q;
    while (true) {
        if (pAncestorsSet.has(qVal)) {
            return qVal;
        } else {
            qVal = fatherMap.get(qVal);
        }
    }

};
// 方法2. 对于一颗子树来说，若p或q出现在他的左子树或右子树，则上报左子节点或右子节点, 否则上报null
// 若两棵子树都上报null，则当前子树与最近公共祖先无关
// 若两课子树都上报非null，则当前子树的根节点就是最近公共祖先
// 若两颗子树一个null一个非null，则上报非null子树的根节点
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) {
        return null;
    } else if (root === p || root === q) {
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right !== null) {
        return root;
    } else if (left === null && right === null) {
        return null;
    } else {
        return left || right;
    }
}

// 序列化和反序列化

// 找到二叉树中给定节点的后继节点（在二叉树中序遍历顺序下，给定节点的下一个节点就是后继节点）
// 方法一 中序遍历，求出中序遍历结果，再寻找后续节点
var inorderSuccessor = function (root, p) {
    let res = [];
    let stack = [];
    let curNode = root;
    while (stack.length > 0 || curNode !== null) {
        if (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        } else {
            curNode = stack.pop();
            res.push(curNode);
            curNode = curNode.right;
        }
    }
    for (let i = 0; i < res.length; i++) {
        if (res[i] === p) {
            if (i === res.length - 1) return null;
            else return res[i + 1];
        }
    }

};
// 方法二 中序遍历，在这个过程中不断更新当前节点的上一个节点preNode，如果当前遍历到的节点的上一个节点就是给定节点，则当前节点就是那个后继节点
var inorderSuccessor2 = function (root, p) {
    let preNode = null;
    let stack = [];
    let curNode = root;
    while (stack.length > 0 || curNode !== null) {
        if (curNode !== null) {
            stack.push(curNode);
            curNode = curNode.left;
        } else {
            curNode = stack.pop();
            // console.log(curNode);
            if (preNode === p) {
                return curNode;
            } else {
                preNode = curNode;
            }
            curNode = curNode.right;
        }
    }
}

// 递归中序遍历记录preNode
let preNode = null;
var inorderSuccessor = function (root, p) {
    if (root === null) {
        return null;
    }
    let leftRes = inorderSuccessor(root.left, p);
    if (leftRes !== null) {
        return leftRes;
    } else if (preNode == p) {
        return root
    } else {
        preNode = root;
        return inorderSuccessor(root.right, p)
    }
}
// 方法三 只有在节点拥有指向父节点指针时可行
// 在树上，1.如果一个节点有右子树，那么这个节点的后继节点是右子树的最左孩子 左-【中】-右
//        2. 如果一个节点没有右子树，且这个是一颗左树的最右节点【左】-中-右
//        3. 如果一个节点没有右子树，且这个节点是一颗右数的最右节点 左-中-【右】
//          对于23两种情况，都是再这个节点没有右树的情况下，不断寻找这个节点的祖先，
//              如果找到某个某个祖先是一个节点的左孩子,那么这个节点就是后继的节点（2情况）
//              如果所有祖先都不是左孩子，那么这个节点后继null（情况3）

var inorderSuccessor = function (root, p) {
    function getMostLeftChild(node) {
        let mostLeftChild = node;
        while (node.left !== null) {
            mostLeftChild = node;
        }
        return mostLeftChild;
    }

    if (p.right !== null) {
        return getMostLeftChild(p.right);
    } else {
        let parent = node.parent;
        while (parent !== null && parent.left !== node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    }
};