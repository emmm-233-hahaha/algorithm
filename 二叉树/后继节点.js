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