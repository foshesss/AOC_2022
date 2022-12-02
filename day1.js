const fs = require("fs");
const FILE_NAME = "textFiles/day1.txt";

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    const calories = data.split('\n');
    const elves = [0];
    let currentElf = 0;

    calories.forEach(calories => {
        if (calories == '') {
            currentElf++;
            elves[currentElf] = 0;
            return;
        }

        calories = Number(calories);
        elves[currentElf] += calories;
    });

    // sort values largest to smallests
    let sortedCalories = elves.sort((a, b) => b - a);

    // get largest value
    console.log(sortedCalories[0]);

    // part2
    let maxCalories = 0;

    // get top 3 values
    for (let i = 0; i <= 2; i++) {
        maxCalories += Number(sortedCalories[i])
    }
    console.log(maxCalories)
});