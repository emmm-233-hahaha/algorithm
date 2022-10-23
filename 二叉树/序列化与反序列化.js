/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 * // 以先序方式序列化一棵树
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    if (root === null) return '#_';
    let res = root.val+'_';
    res += serialize(root.left);
    res += serialize(root.right);
    return res;
};

/**
 * Decodes your encoded data to tree.
 * 以先序方式反序列化一棵树
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    let dataQueue = data.split('_'); // 把序列化的结果转成队列
    process();
    function process() {
        let val = dataQueue.shift();
        if (val === '#') return null;

        let head = new TreeNode(val);
        head.left = process();
        head.right = process();
    }
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */