function swap(arr, left, right) { // 交换一个数组中两个位置的元素
    const leftValue = arr[left];
    arr[left] = arr[right];
    arr[right] = leftValue;
}

function heapInsert(arr, index) { // 某个数在index位置处，可能需要向上移动
    let fatherIndex = Math.floor((index - 1) / 2);
    while (fatherIndex >= 0 && arr[index] > arr[fatherIndex]) {
        swap(arr, fatherIndex, index);
        index = fatherIndex;
        fatherIndex = Math.floor((index - 1) / 2);
    }
}

function heapify(arr, index, heapSize) { // 某个数在index位置处，可能需要向下移动
    let leftIndex = index * 2 + 1;
    while (leftIndex < heapSize) {
        let rightIndex = leftIndex + 1
        let larggest = heapSize > rightIndex && arr[rightIndex] > arr[leftIndex] ? rightIndex : leftIndex;
        larggest = arr[index] > arr[larggest] ? index : larggest;
        if (index === larggest) break;
        swap(arr, index, larggest);
        index = larggest;
        leftIndex = index * 2 + 1;
    }

}

// 堆排序
function heapSort(arr) {
    if (!arr || arr.length < 2) return;

    let heapSize = arr.length;
    for (let i = 1; i < heapSize; i++) {// 用逐个插入的方法将数组变成大根堆（方法一）
        heapInsert(arr, i);
    }

    // 也可以用倒序调整的方法将数组变成大根堆(方法二)
    // for (let index = arr.length; index > 0; index--) {
    //     heapify(arr, index, arr.length);
    // }


    while (heapSize > 0) {
        swap(arr, 0, heapSize - 1);
        heapSize--;
        heapify(arr, 0, heapSize);

    }

}


let array = [5, 1, 6, 7, 4, 2, 10];
heapSort(array);
console.log(array);


// 堆排序拓展：一个几乎有序的数组，即每个元素现在的位置距离他排好序后的位置的距离不超过K，
// 并且K相对于数组的长度很小。



