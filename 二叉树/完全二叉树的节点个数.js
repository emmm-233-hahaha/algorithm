
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    let res = process(root);
    console.log(res);
    function process(node) {
        if (node === null) return 0;
        let cur = node;
        let depth = 0; // 二叉树的深度
        while (cur !== null) {
            depth++;
            cur = cur.left;
        }

        cur = node.right;
        let depthright = 1
        while (cur !== null) {
            depthright++;
            cur = cur.left;
        }
        if (depth === depthright) {
            return Math.pow(2, depth - 1) + process(node.right)
        } else {
            return Math.pow(2, depth - 2) + process(node.left)
        }
    }
};

let root = new TreeNode(1)
root.left = new TreeNode(2);
root.right = new TreeNode(3);

console.log(countNodes(root));