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