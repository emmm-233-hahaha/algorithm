function getPostArray(preOrder, inOrder) {
    console.log(process(preOrder, inOrder))
    function process(preArr, inArr) {
        if (preArr.length === 0) return [];
        if (inArr.length === 0) return [];
        if (preArr.length === 1) return preArr;
        if (inOrder.length === 1) return inOrder;

        let root = preArr[0];
        let rootIndex = inArr.indexOf(root);
        let arr1 = preArr.slice(1, 1 + rootIndex)
        let arr2 = preArr.slice(1 + rootIndex)
        let arr3 = inArr.slice(0, rootIndex)
        let arr4 = inArr.slice(rootIndex+1)
        let left = process(arr1, arr3)
        let right = process(arr2, arr4)
        return [...left,...right,root];
    }
}

getPostArray([1, 2], [ 2, 1])