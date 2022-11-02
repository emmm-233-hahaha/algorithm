function makeEqual(low, high, start, end) {
    let diff = end - start;

    // console.log(process(diff));
    console.log(process2(diff));

    function process(rest) {
        if (rest === 0) return 0;

        let num = Infinity
        for (let i = low; i <= high; i++) {
            if (i <= rest) {
                num = Math.min(num, process(rest - i) + 1)
            }
        }
        return num;
    }

    function process2(rest) {
        if (rest === 0) return 0;

        let num = -Infinity
        for (let i = low; i <= high; i++) {
            if (i <= rest) {
                num = Math.max(num, process2(rest - i) + 1)
            }
        }
        return num;
    }
}

makeEqual(2, 5, 10, 50);