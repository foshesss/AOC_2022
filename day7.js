const fs = require("fs");
const FILE_NAME = "textFiles/day7.txt";

const checkDirectorySize = (directory, callback) => {
    const entries = Object.entries(directory);

    let sum = 0;
    entries.forEach(([key, value]) => {
        if (typeof value === 'string') return;
        if (key === "__prev") return;
        if (typeof value === 'number') {
            sum += value;
            return
        }

        const dirSize = checkDirectorySize(value);
        sum += dirSize;
    });

    return sum;
}

const part1 = (_, directories) => {
    const sum = directories.reduce((acc, elem) => {
        const size = checkDirectorySize(elem);

        if (size <= 100000) {
            acc += size;
        }
        return acc;
    }, 0)

    return sum;
}

const part2 = (directory, directories) => {
    const goal = Math.abs(40000000 - checkDirectorySize(directory));
    let smallest = Number.MAX_VALUE;
    let smallestDir;

    for (let i = 0; i < directories.length; i++) {
        const size = checkDirectorySize(directories[i])
        if (size >= goal && Math.min(size, smallest) === size) {
            smallest = size;
            smallestDir = directories[i];
        }
    }
    
    delete smallestDir.__prev[smallestDir.__name];

    return smallest;
}

fs.readFile(FILE_NAME, 'utf8', function(_, data){
    data = data.split('\n');

    const directory = {
        ["/"]: {}
    }
    let currentDirectory = directory["/"];

    let directories = [];

    const createDirectory = (dir) => {
        const newDirectory = {
            __name: dir,
            __prev: currentDirectory
        }
        directories.push(newDirectory);
        return newDirectory;
    }

    data.forEach(cmd => {
        if (cmd.includes("$ cd ..")) {
            currentDirectory = currentDirectory.__prev;
        } else if (cmd.includes("$ cd /")) {
            currentDirectory = directory["/"];
        } else if (cmd.includes("$ cd")) {
            dir = cmd.split(" ")[2];

            if (!currentDirectory[dir]) {
                currentDirectory[dir] = createDirectory(dir);
            }
            currentDirectory = currentDirectory[dir];
        } else if (cmd.includes("$ ls")) {
            // do nothing
        } else if (cmd.includes("dir ")) {
            dir = cmd.split(" ")[1];
            currentDirectory[dir] = createDirectory(dir);
        } else {
            const [size, name] = cmd.split(" ");
            currentDirectory[name] = Number(size);
        }
    })
    console.log(part1(directory, directories));
    console.log(part2(directory, directories));
});
