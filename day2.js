const fs = require("fs");
const FILE_NAME = "textFiles/day2.txt";

const values = {
    A: 1,
    X: 1,
    B: 2,
    Y: 2,
    C: 3,
    Z: 3
}

const part1 = (games) => {
    let p2Score = 0;

    games.forEach(([p1, p2]) => {
        if (values[p1] == values[p2]) {
            p2Score += 3;
        } else if (
            (p1 == 'A' && p2 == 'Y') || 
            (p1 == 'B' && p2 == 'Z') || 
            (p1 == 'C' && p2 == 'X')) {
            p2Score += 6;
        } 

        p2Score += values[p2];
    })
    console.log(p2Score)
}

const part2 = (games) => {
    let p2Score = 0;

    games.forEach(([p1, p2]) => {
        //  tie
        if (p2 == 'Y') {
            p2 = p1;
            p2Score += 3
        // loss
        } else if (p2 == 'X') {
            if (p1 == 'A') {
                p2 = 'Z'
            } else if (p1 == 'B') {
                p2 = 'X'
            } else {
                p2 = 'Y'
            }
        // win
        } else {
            if (p1 == 'A') {
                p2 = 'Y'
            } else if (p1 == 'B') {
                p2 = 'Z'
            } else {
                p2 = 'X'
            }
            p2Score += 6
        }

        p2Score += values[p2];
    })

    console.log(p2Score)
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    data = data.split('\n');
    const games = data.map(e => e.split(" "));
    
    // part1
    part1(games)

    // part2
    part2(games)
});