// each line is a rucksack
// line has two halves for two compartments
// need to find things that appear in both halves

import { readFileSync } from "fs";

const getCompartments = (line: string) => {
    if(line.length%2 !== 0) console.log("Danger line! " + line);
    const halfLength = line.length/2;
    return {
        first: line.substring(0, halfLength),
        second: line.substring(halfLength, line.length)
    };
}

const getOverlap = (firstCompartment: string, secondCompartment: string) => {
    const first = Array.from(firstCompartment);
    const second = Array.from(secondCompartment);

    const overlap = first.filter(x => second.includes(x));
    return overlap;
}

const getCharPriority = (char: string) => {
    const charCode = char.charCodeAt(0);
    if(char === char.toUpperCase()) {
        // console.log(char + " is upper and its code is " + charCode);
        // it's upper case
        // 65 -> 27
        // console.log("returning " + (charCode-38));
        return (charCode - 38);
    } else {
        // console.log(char + " is lower and its code is " + charCode);
        // it's lower case
        // 97 -> 1
        // console.log("returning " + (charCode-96));
        return (charCode - 96);
    }
};

const answerPart1 = (lines: string[]) => {
    return lines
        .map((line) => {
            const compartments = getCompartments(line.trim());
            const overlap = getOverlap(compartments.first, compartments.second);

            return getCharPriority(overlap[0]);
        })
        .filter(x => !Number.isNaN(x))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const answerPart2 = (lines: string[]) => {
    if(lines.length%3 !=0 ) console.log(lines.length);

    let chunks: string[][] = [];

    const chunkCount = lines.length/3;
    
    // split into chunks of three lines
    let i = 0;
    for(i=0; i < chunkCount ; i++ ) {
        let thisThree = [lines.shift(),lines.shift(),lines.shift()];
        chunks.push(thisThree);
    }
    // for each chunk, compare 2 lines, then result against third
    return chunks.map((three) => {
        const overlap = getOverlap(
                getOverlap(three[0], three[1]).toString(), // nasty
                three[2]
            );
        return getCharPriority(overlap[0]);
    })
    .filter(x => !Number.isNaN(x))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const testInput = readFileSync("day3/testInput.txt").toString().split('\n').filter(line => line.length!==0);
console.log("Test answer is " + answerPart1(testInput));
console.log("Test answer 2 is " + answerPart2(testInput));

const inputString = readFileSync("day3/input.txt").toString();
const lines: string[] = inputString.split('\n').filter(line => line.length!==0);
console.log("Answer is " + answerPart1(lines));
console.log("Answer 2 is " + answerPart2(lines));