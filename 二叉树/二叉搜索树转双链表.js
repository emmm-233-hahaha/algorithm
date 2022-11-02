
// Definition for a Node.
function Node(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
};

/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
    if (root === null) return root;
    let result = process(root);
    result[0].left = result[1];
    result[1].right = result[0];
    return result[0];

    function process(node) {
        if (node === null) return [];

        if (node.left === null && node.right === null) return [node, node]

        let leftres = process(node.left);

        let rightres = process(node.right);

        if (leftres.length > 0 && rightres.length > 0) {
            leftres[1].right = node;
            node.left = leftres[1];
            node.right = rightres[0];
            rightres[0].left = node;
            return [leftres[0], rightres[1]];
        } else if (leftres.length > 0) {
            leftres[1].right = node;
            node.left = leftres[1];
            return [leftres[0], node];
        } else {
            node.right = rightres[0];
            rightres[0].left = node;
            return [node, rightres[1]];
        }
    }

};


//let one = new Node(1, null, null)
let three = new Node(3, null, null)
//let five = new Node(1, null, null)
let two = new Node(2, null, three);
//let four = new Node(4, two, five);


treeToDoublyList(two);