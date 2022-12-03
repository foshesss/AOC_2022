const fs = require("fs");
const FILE_NAME = "textFiles/day3.txt";

const part1 = (data) => {
    const seen = {

    }

    data.forEach(e => {
        s0 = new Set(e.slice(0, e.length/2).split(''));
        s1 = new Set(e.slice(e.length/2, e.length));
        

        s0.forEach(c => {
            if (s1.has(c)) {
                seen[c] = seen[c] ? seen[c] + 1 : 1;
            }
        })
    });

    let sum = 0;

    Object.entries(seen).forEach(([key, amount]) => {
        let value = key.charCodeAt(0)

        // 'a'
        if (value >= 97) {
            value -= 96;
        } else {
            value = 26 + value - 64;
        }

        sum += value * amount
    })

    console.log(sum);
}

const part2 = (data) => {
    const seen = {

    }

    // chunk array
    const chunkSize = 3;
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);

        s0 = new Set(chunk[0].slice(''));
        s1 = new Set(chunk[1].slice(''));
        s2 = new Set(chunk[2].slice(''));

        s0.forEach(c => {
            if (s1.has(c) && s2.has(c)) {
                seen[c] = seen[c] ? seen[c] + 1 : 1;
            }
        })
    }

    let sum = 0;

    Object.entries(seen).forEach(([key, amount]) => {
        let value = key.charCodeAt(0)

        // 'a'
        if (value >= 97) {
            value -= 96;
        } else {
            value = 26 + value - 64;
        }

        sum += value * amount
    })

    console.log(sum);
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    data = data.split('\n');


    // part1(data);
   part2(data);
});