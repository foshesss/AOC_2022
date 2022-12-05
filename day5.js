const fs = require("fs");
const FILE_NAME = "textFiles/day5.txt";

const getCargo = cargo => {
    cargo = cargo.split('\n').map(row => row.match(/.{1,4}/g));
    const values = [];

    // loop through each row
    cargo.forEach(row => {
        if (row == null) return;
        row.forEach((value, index) => {
            if (!value.match(/\[[A-Z]\]/)) return;
            value = value.charAt(1); // get character
            if (!values[++index]) values[index] = [];
            values[index].push(value);
        })
    })
    values.map(e => e.reverse());

    return values;
}

const part1 = ([cargo, directions]) => {
    directions.forEach(direction => {
        [amount, from, to] = direction.split(' ').map(Number);

        for (let i = 0; i < amount; i++) {
            cargo[to].push(cargo[from].pop());
        }
    })
}

const part2 = ([cargo, directions]) => {
    directions.forEach(direction => {
        [amount, from, to] = direction.split(' ').map(Number);

        let toAdd = [];

        for (let i = 0; i < amount; i++) {
            toAdd.push(cargo[from].pop());
        }

        toAdd = toAdd.reverse()
        cargo[to] = cargo[to].concat(toAdd);
    })
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    let [cargo, directions] = data.split('-----\n');

    cargo = getCargo(cargo)
    directions = directions.split('\n').map(str => {
        str = str.replace("move ", "");
        str = str.replace(" from", "");
        str = str.replace(" to", "");
        return str;
    })

    // part1([cargo, directions]);
    part2([cargo, directions]);

    let finalCargo = "";
    cargo.forEach(arr => {
        finalCargo += arr[arr.length - 1];
    })
    console.log(finalCargo);
});