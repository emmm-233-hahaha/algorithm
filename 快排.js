function quickSort(arr, L, R) {
    if (L >= R) return;
    let randomIndex = Math.floor(Math.random() * (R - L + 1)) + L;
    let parVal = arr[randomIndex];  // 随机选取一个数
    swap(arr, randomIndex, R); // 把这个数放到待排序区域的最后一位
    let partitionRes = partion(arr, L, R);
    quickSort(arr, L, partitionRes[0] - 1);
    quickSort(arr, partitionRes[1] + 1, R);
}

function partion(arr, L, R) {
    let less = L - 1;
    let more = R;
    while (L < more) {
        if (arr[L] === arr[R]) {
            L++;
        } else if (arr[L] > arr[R]) {
            more--;
            swap(arr, L, more);
        } else {
            less++;
            swap(arr, L, less);
            L++;
        }
    }
    swap(arr,R,more)
    return [less + 1, more];
}

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

let unsortedArr = [9, 5, 2, 3, 5, 6, 7, 12, 1, 2, 5, 8]
quickSort(unsortedArr, 0, 11);
console.log(unsortedArr);