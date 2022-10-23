function mergeSort(arr, leftIndex, rightIndex) {
    if (leftIndex === rightIndex) return [arr[leftIndex]];
    let midIndex = Math.floor((leftIndex + rightIndex) / 2);

    let leftSorted = mergeSort(arr, leftIndex, midIndex);
    let rightSorted = mergeSort(arr, midIndex + 1, rightIndex);

    let leftptr = 0;
    let rightptr = 0;
    let merged = [];
    while (leftptr < leftSorted.length && rightptr < rightSorted.length) {
        if (leftSorted[leftptr] < rightSorted[rightptr]) {
            merged.push(leftSorted[leftptr]);
            leftptr++;
        } else {
            merged.push(rightSorted[rightptr]);
            rightptr++;
        }
    }
    while (leftptr < leftSorted.length) {
        merged.push(leftSorted[leftptr]);
        leftptr++;
    }
    while (rightptr < rightSorted.length) {
        merged.push(rightSorted[rightptr]);
        rightptr++;
    }

    return merged;

}
let arr = [1, 1, 3, 5, 2, 2, 7, 4, 4];
console.log(mergeSort(arr, 0, arr.length - 1));