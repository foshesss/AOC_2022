const fs = require("fs");
const FILE_NAME = "textFiles/day4.txt";

const part1 = (data) => {
    let shared = 0;
    data.forEach(e => {
        // AHHH I WAS SO SLOW BECAUSE I WAS GETTING THE WRONG ANSWER
        // (I DIDNT CAST TO NUMBER AND WAS COMPARING STRINGS)
        // '15' < '4' == true
        // I AM SO UPSET
        const [[x0, y0], [x1, y1]] = e.split(',').map(e => {
            return e.split('-').map(Number); // .map(Number) fixes everything
        });

        if ((x0 <= x1 && y0 >= y1) || 
            (x0 >= x1 && y0 <= y1)) {
            shared++;
        }
    })
    console.log(shared);
}

const part2 = (data) => {
    let shared = 0;

    data.forEach(e => {
        const [[x0, y0], [x1, y1]] = e.split(',').map(e => {
            return e.split('-').map(Number);
        });

        if ((x0 <= x1 && x1 <= y0) || 
            (x0 <= y1 && y1 <= y0) ||
            (x1 <= x0 && x0 <= y1) ||
            (x1 <= y0 && y0 <= y1)
            ) {
            shared++;
        }
    })
    
    console.log(shared);
}


fs.readFile(FILE_NAME, 'utf8', function(_, data) {
    data = data.split('\n');

    part1(data)
    part2(data)
});