const fs = require("fs");
const FILE_NAME = "textFiles/day9.txt";

const part1 = (data) => {

    const uniquePositions = new Set();

    let h = [0, 0];
    let lastHPosition = h;
    let t = [0, 0];

    uniquePositions.add(t[0] + "," + t[1]);

    data.forEach(([direction, amount]) => {
        // used to assign direction
        const axis = direction === "D" || direction === "U" ? 1 : 0;
        direction = 
            direction === "D" || direction === "L" ? -1 : 1;

        for (let i = 1; i <= amount; i++) {
            lastHPosition = [...h];
            h[axis] += direction;

            if (Math.abs(t[0] - h[0]) <= 1 
                && Math.abs(t[1] - h[1]) <= 1 ) {
                continue;
            }
            t = lastHPosition;
            uniquePositions.add(t[0] + "," + t[1]);
        }
    })

    return uniquePositions.size;
}

const part2 = (data) => {
    const uniquePositions = new Set();

    const nodes = [];
    for (let i = 0; i < 10; i++) {
        nodes[i] = [0,0];
    }
    uniquePositions.add(0 + "," + 0);

    data.forEach(([direction, amount]) => {
        // used to assign direction
        const axis = direction === "D" || direction === "U" ? 1 : 0;
        direction = 
            direction === "D" || direction === "L" ? -1 : 1;

        for (let j = 0; j < amount; j++) {
            for (let i = 0; i < nodes.length; i++) { 
                if (i === 0) {
                    nodes[i][axis] += direction;
                    continue;
                }

                const h = nodes[i - 1];
                const t = nodes[i];

                const xDist = Math.abs(t[0] - h[0]);
                const yDist = Math.abs(t[1] - h[1]);

                if (xDist <= 1 && yDist <= 1) {
                    continue;
                } else if (xDist >= 2 && yDist >= 2) {
                    t[0] = t[0]<h[0] ? h[0]-1 : h[0]+1;
                    t[1] = t[1]<h[1] ? h[1]-1 : h[1]+1;
                } else if (xDist >= 2) {
                    t[0] = t[0]<h[0] ? h[0]-1 : h[0]+1;
                    t[1] = h[1];
                } else if (yDist >= 2) {
                    t[0] = h[0];
                    t[1] = t[1]<h[1] ? h[1]-1 : h[1]+1;
                }
            }

            const tail = nodes[nodes.length - 1];
            uniquePositions.add(tail[0] + "," + tail[1]);
        }
    })

    return uniquePositions.size;
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    data = data.split('\n').map(e => {
        e = e.split(" ");
        e[1] = Number(e[1]);
        return e;
    });
    console.log(part1(data));
    console.log(part2(data));
});
