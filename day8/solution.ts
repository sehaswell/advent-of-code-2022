import { readAndSplit } from "../utils/fileUtils";
import { chunkLine } from "../utils/lineChunker";

// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it

// outside trees are always visible
// iterate over all of them
// need to look from top/bottom and sides
// need to avoid counting any twice

// is visible(element, array)
// pass different permutations to this?
// for each tree, check if it's visible in at least one way
// if it's element 0 then yes
// it it's element n-1 then yes
// if the sorted array has it in the same position?? not if there's duplicates

// parse input into columns and rows
let rows: number[][] = [];
let columns: number[][] = [];
let outsideTrees = 0;

const parseLine  = (line: string) => {
    // if(line.trim().length===0) return;
    const chunkedLine: number[] = chunkLine(line.trim(), 1).map(x => parseInt(x));
    rows.push(chunkedLine);
    for(let i=0; i<chunkedLine.length; i++) {
        columns[i].push(chunkedLine[i]);
    }
};

const visibleFromStart = (index: number, array: number[]): boolean => {
    for(let j = 0; j < index; j++) {
        if( array[j] >= array[index] ) return false;
    }    
    return true;
}

const visibleFromEnd = (index: number, array: number[]): boolean => {
    for(let j = array.length-1; j > index; j--) {
        if( array[j] >= array[index] ) return false;
    }    
    return true;
}

const isVisible = (x: number, y: number): boolean => {
    if(x===0 || y===0) {
        outsideTrees++;
        return true;
    }
    if(x===columns.length-1 || y===rows.length-1) { 
        outsideTrees++;
        return true;
    }

    // check visibility in row from both ends
    if(visibleFromStart(x, rows[y])) {return true;}
    if(visibleFromEnd(x, rows[y])) {return true;}

    // check visibilty in column from both ends
    if(visibleFromStart(y, columns[x])) {return true;}
    if(visibleFromEnd(y, columns[x])) {return true;}

    return false;
}

const partOne = (input: string[]) => {
    // create views
    for(let i = 0; i < input[0].trim().length; i++){
        columns.push([]);
    };
    
    // console.log(columns);
    input.map((x) => parseLine(x.trim()));
    console.log("rows: " + rows.length);
    console.log("columns: " + columns.length);

    let visibleTrees = 0;
    let totalTrees = 0;
    for(let x = 0; x<columns.length; x++) {
        for(let y=0; y<rows.length; y++) {
            totalTrees++;
            if(isVisible(x,y)) visibleTrees++;
        }
    }

    // console.log("Total trees " + totalTrees);
    // console.log("Total visible trees " + visibleTrees);
    // console.log("Outside trees: " + outsideTrees);

    return visibleTrees;
};

const partTwo = (input: string[]) => {
    return "the answer to part two";
};

const testInput: string[] = readAndSplit("day8/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo(testInput));

rows = [];
columns = [];
outsideTrees = 0;

const input: string[] = readAndSplit("day8/input.txt");
console.log("Real answer 1 is " + partOne(input));
console.log("Real answer 2 is " + partTwo(input));