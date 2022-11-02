/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 给你一棵以 root 为根的 二叉树 ，请你返回 任意 二叉搜索子树的最大键值和。

/**
子树是否搜索二叉树
子树最大值
子树最小值
子树上 最大键值和
 */

function Info(isBST, maxVal, minVal, maxSum) {
    this.isBST = isBST;
    this.maxVal = maxVal;
    this.minVal = minVal;
    this.maxSum = maxSum;
}
var maxSumBST = function (root) {
    let resmax = 0;
    let r = process(root);
    console.log(r);
    return resmax;

    function process(node) {
        if (node === null) return null;
        if (node.left === null && node.right === null) {
            resmax = Math.max(resmax, node.val);
            return new Info(true, node.val, node.val, node.val);
        }

        let leftres = process(node.left);
        let rightres = process(node.right);

        if (leftres && rightres) {
            if (leftres.isBST && rightres.isBST && node.val > leftres.maxVal && node.val < rightres.minVal) {
                resmax = Math.max(resmax, leftres.maxSum + node.val + rightres.maxSum);
                return new Info(true, rightres.maxVal, leftres.minVal, leftres.maxSum + node.val + rightres.maxSum);
            } else {
                resmax = Math.max(resmax, leftres.maxSum, rightres.maxSum);
                return leftres.maxSum > rightres.maxSum ?
                    new Info(false, 0, 0, leftres.maxSum) : new Info(false, 0, 0, rightres.maxSum);
            }
        } else if (leftres) {
            if (leftres.isBST && node.val > leftres.maxVal) {
                resmax = Math.max(resmax, leftres.maxSum + node.val);
                return new Info(true, node.val, leftres.minVal, leftres.maxSum + node.val);
            } else {
                resmax = Math.max(resmax, leftres.maxSum);
                return new Info(false, 0, 0, leftres.maxSum);
            }
        } else {
            if (rightres.isBST && node.val < rightres.minVal) {
                resmax = Math.max(resmax, rightres.maxSum + node.val);
                return new Info(true, rightres.maxVal, node.val, rightres.maxSum + node.val);
            } else {
                resmax = Math.max(resmax, rightres.maxSum);
                return new Info(false, 0, 0, rightres.maxSum);
            }

        }
    }
};