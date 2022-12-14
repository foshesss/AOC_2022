const fs = require("fs");
const FILE_NAME = "textFiles/day6.txt";

const retrieveAnswer = (data, strLength) => {
    for (let i = 0; i < data.length; i++) {
        if (i < strLength) continue;
        if (new Set(data.substring(i - strLength, i)).size !== strLength) continue;
        return i;
    }
}

const part1 = (data) => {
    console.log(retrieveAnswer(data, 4));
}

const part2 = (data) => {
    console.log(retrieveAnswer(data, 14));
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    part1(data);
    part2(data);
});
