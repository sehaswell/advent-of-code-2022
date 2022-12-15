import { compareNumbers } from "../utils/compareNumbers"
import { readAndSplit } from "../utils/fileUtils"

// where content object is
type FileInfo = {
    name: string,
    size: number
}

type DirectoryContent = {
    fullPath: string,
    subDirs: string[],
    files: FileInfo[]
}

// key should be full path
// allows recursion by appending
type DirectoryMap = {
    [key: string]: DirectoryContent
}

let directoryMap: DirectoryMap = {};
let directorySizes: number[] = [];
let bigTotal: number;

// turn lines into Directory Content
const parseDir = (content: string[][], path: string) => {
    let thisDir: DirectoryContent = {
        fullPath: path,
        subDirs: [],
        files: []
    };

    // for each line, figure out if it's dir or file
    // add the right info to the object
    content.map((line: string[]) => {
        if(line[0] === "dir") {
            // console.log("Adding dir " + line[1]);
            thisDir.subDirs.push("/" + line[1]);
        } else {
            thisDir.files.push({
                name: line[1],
                size: parseInt(line[0])
            });
        }
    });

    // console.log("Parsed dir ");
    // console.log(thisDir);
    return thisDir;
}

const sumDirectory = (dir: DirectoryContent) => {
    // console.log("Directory " + dir.fullPath + " contains " + dir.files.length + " files and " + dir.subDirs.length + " sub-directories");
    // get sum of actual files
    let sum = 0;
    
    // checks probably not needed - should reduce to 0 anyway?
    if(dir.files.length != 0) {
        sum += dir.files.reduce(
            (fileSum, file) => fileSum + file.size,
            0
        );
    }

    // and recursively get for children
    if(dir.subDirs.length != 0) {
        sum += dir.subDirs.reduce(
            (subDirSum, subDir) => {
                const stepIntoDir = dir.fullPath==='/' ? subDir : dir.fullPath + subDir;
                // console.log("Stepping into " + stepIntoDir);
                return (subDirSum + sumDirectory(directoryMap[stepIntoDir]))
            },
            0
        );
    }

    directorySizes.push(sum);
    return sum;
};

const buildDirectoryMap = (chunkedLines: string[][]) => {
    let currentPath = ['/'];

    // while chunky input left, process line and then get rid of it
    while(chunkedLines.length !== 0) {
        // if line doesn't start with $, something is wrong
        if(chunkedLines[0][0].trim() !== '$') {
            console.error("Not a command: " + chunkedLines[0][0]);
        }

        // console.log("chunkedLines[0] " + chunkedLines[0].join( ));
        switch(chunkedLines[0][1].trim()) {
            case "cd":                
                // if line is a cd, update current dir path
                switch(chunkedLines[0][2].trim()) {
                    case '/':
                        currentPath = ['/'];
                        break;
                    case '..':
                        currentPath.pop();
                        break;
                    default:
                        if(currentPath.length === 1) {
                            currentPath.push(chunkedLines[0][2]);
                        } else {
                            // add slash to prevent issues with dir names being substrings of others
                            currentPath.push('/' + chunkedLines[0][2]);
                        }
                        break;
                }
                chunkedLines.shift();
                // console.log("Current path is " + currentPath.join(''));
                break;            
            case "ls":
                // if line is an ls, accumulate next few non-command lines
                chunkedLines.shift(); // get rid of the ls line
                const lsOutput = [];
                // if the next line isn't a command, pop it onto here
                while (chunkedLines.length !== 0 && chunkedLines[0][0].trim() != '$') {
                    lsOutput.push(chunkedLines.shift());
                }

                // add this content to map
                // console.log("Adding " + currentPath.join('') + " to map");
                directoryMap[currentPath.join('')] = parseDir(lsOutput, currentPath.join(''));
                break;            
            default:
                console.error("Unrecognised command " + chunkedLines[0][1]);
                chunkedLines.shift();
                break;
        }
    }
}

const partOne = (input: string[]) => {
    // split each line by space, check line[0] for $
    // chunk lines into commands-output sets
    // iterate over, keeping track of current directory
    let chunkedLines: string[][] = input.map((line: string) => {
        return line.trim().split(' ');
    });

    buildDirectoryMap(chunkedLines);
    // console.log(directoryMap);

    // call sumDir on top level
    if(directoryMap['/'] !== undefined) {
        bigTotal = sumDirectory(directoryMap['/']);
        // console.log("bigTotal: " + bigTotal);
        return directorySizes.reduce(
            (runningTotal, value) => {                
                return value <= 100000 ? (runningTotal + value) : runningTotal;
            },
            0
        );
    } else {
        return "pig";
    }
};

const partTwo = () => {
    const totalCapacity = 70000000;
    const neededSpace = 30000000;

    const currentlyAvailable = totalCapacity - bigTotal;
    const needToFree = neededSpace - currentlyAvailable;

    const suitableDirSizes = directorySizes.filter(x => x >= needToFree);
    // console.log(needToFree);
    // console.log(suitableDirSizes);
    return suitableDirSizes.sort(compareNumbers)[0];
    // take big total from totalCapacity to get what's available
    // take that from needed space to get what needs to be freed
    // remove everything smaller than that from directorySizes
    // sort
    // return smallest
};

const testInput: string[] = readAndSplit("day7/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo());

// reset these
directoryMap = {};
directorySizes = [];
bigTotal = undefined;

const input: string[] = readAndSplit("day7/input.txt");
console.log("Real answer 1 is " + partOne(input));
console.log("Real answer 2 is " + partTwo());
