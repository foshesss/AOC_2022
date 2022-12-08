const fs = require("fs");
const FILE_NAME = "textFiles/day8.txt";

const part1 = (data) => {
    let trees = new Set();

    const addToTree = (x, y) => {
        const key = x + ',' + y;
        trees.add(key);
    };

    // rows
    {

        for (let i = 0; i < data.length; i++) {
            let highestValueLeft = Number.NEGATIVE_INFINITY;
            let highestValueRight = Number.NEGATIVE_INFINITY;

            for (let j = 0; j < data[0].length; j++) {
                const leftTree = data[i][j]
                if (leftTree > highestValueLeft) {
                    addToTree(i, j);
                    highestValueLeft = leftTree;
                }

                const rightTree = data[i][data[0].length - 1 - j];
                if (rightTree > highestValueRight) {
                    addToTree(i, data[0].length - 1 - j);
                    highestValueRight = rightTree;
                }
            }
        }
    };

    // cols
    {
        for (let i = 0; i < data[0].length; i++) { // row
            let highestValueTop = Number.NEGATIVE_INFINITY;
            let highestValueBottom = Number.NEGATIVE_INFINITY;

            for (let j = 0; j < data.length; j++) { // col
                const topTree = data[j][i];
                if (topTree > highestValueTop) {
                    addToTree(j, i);
                    highestValueTop = topTree;

                }

                const bottomTree = data[data.length - j - 1][i];
                if (bottomTree > highestValueBottom) {
                    addToTree(data.length - j - 1, i);
                    highestValueBottom = bottomTree;
                }
            }
        }
    }

    return trees.size;
}

const getScore = (data, x, y) => {
    const goalTree = data[x][y];

    const axes = [
        0, 0, 0, 0
        // left, right, up, down
    ];

    // check top
    for (let i = 1; i <= x; i++) {
        const currTree = data[x - i][y];
        axes[0] = i;
        if (goalTree <= currTree) break;
    }

    // check right
    for (let i = x + 1; i < data.length; i++) {
        const currTree = data[i][y];
        axes[1] = i - x;
        if (goalTree <= currTree) break;
    }

    // check top
    for (let i = 1; i <= y; i++) {
        const currTree = data[x][y - i];
        axes[2] = i;
        if (goalTree <= currTree) break;
    }

    // check bottom
    for (let i = y + 1; i < data[0].length; i++) {
        const currTree = data[x][i];
        axes[3] = i - y;
        if (goalTree <= currTree) break;
    }

    return axes.reduce((acc, elem) => acc * elem, 1)
}

const part2 = (data) => {
    let largest = Number.NEGATIVE_INFINITY;

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[0].length; y++) {
            largest = Math.max(getScore(data, x, y), largest);
        }
    }

    return largest;
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    data = data.split('\n').map(e => e.split("").map(Number));
    console.log(part1(data));
    console.log(part2(data));
});
