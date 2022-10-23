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