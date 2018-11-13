function subsetSum(setOfNums, requiredSum) {
    let totalSumOfNums = setOfNums.reduce((agg, value) => agg + value);
    let i;
    let truthTable = new Array(setOfNums.length);
    for (i = 0; i < truthTable.length; i++) {
        truthTable[i] = new Array(totalSumOfNums + 1);
    }
    for (i = 0; i < setOfNums.length; i++) {
        truthTable[i][0] = true;
    }
    for (i = 1; i < setOfNums.length; i++) {
        for (j = 1; j < requiredSum; j++) {
            if (j - setOfNums[i] >= 0) {
                truthTable[i][j] =
                    truthTable[i][j] || truthTable[i][j - setOfNums[i]];
            } else {
                truthTable[i][j] = truthTable[i][j];
            }
        }
    }
    for (i = 0; i < truthTable.length; i++) {
        for (j = 0; j < truthTable[0].length; j++) {
            if (truthTable[i][j] === true) {
                console.log(i, j);
            }
        }
    }
    console.log(truthTable);
    return truthTable[setOfNums.length][requiredSum];
}
function checkIf() {
    let sum = 0;
    const total = 20;
    let marks = [1, 10, 5, 10, 2];
    marks.sort((a, b) => a - b);

    let i = 0;
    while (sum != total && marks.length > 0) {
        if (sum > total) {
            sum -= marks[0];
            marks.splice(0, 1);
        } else {
            sum += marks[i];
        }
        i++;
        console.log(marks, i);
    }
    console.log(sum);
}
const inp = [1, 3, 5, 7];
console.log(subsetSum(inp, 8));
