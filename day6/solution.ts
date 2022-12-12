import { readFileSync } from "fs";
import { chunkLine } from "../utils/lineChunker";
import { sampleA, sampleB, sampleC, sampleD, sampleE } from "./testInput";

const findNonRepeatingSubstring = (input: string, windowSize: number) => {
    const bigArray = chunkLine(input, 1);
    // some kind of sliding window fanciness
    // does window need to fully slide?
    // build up the letter set
    // at index i
    // keep last few in array
    // at each letter, if it doesn't match any in array, add it and move on
    // if it does match, add it, but chuck out the previous one and any before it

    // e.g. [f, k, s]
    // encounter p, compare & find we don't have it, push it to array (& we're done)
    // encounter k, compare & find we do have it, unshift until we find a k, continue

    // probably doable with an accumulator

    let answer;
    let window: string[] = [];
    bigArray.some((element, index) => {
        if(window.includes(element)) {
            while(window.shift() !== element) {
                // console.log("Ditching!");
            }
        }
        
        window.push(element);

        if( window.length === windowSize) {
            answer = index + 1;
            return true;
        }
    });

    return answer;
};

const partOne = (input: string) => findNonRepeatingSubstring(input, 4);
const partTwo = (input: string) => findNonRepeatingSubstring(input, 14);

console.log("test answer A is " + partOne(sampleA));
console.log("test answer B is " + partOne(sampleB));
console.log("test answer C is " + partOne(sampleC));
console.log("test answer D is " + partOne(sampleD));
console.log("test answer E is " + partOne(sampleE));

const input = readFileSync("day6/input.txt").toString();
console.log("Answer 1 is " + partOne(input));

console.log("test answer 2 A is " + partTwo(sampleA));
console.log("test answer 2 B is " + partTwo(sampleB));
console.log("test answer 2 C is " + partTwo(sampleC));
console.log("test answer 2 D is " + partTwo(sampleD));
console.log("test answer 2 E is " + partTwo(sampleE));

console.log("Answer 2 is " + partTwo(input));
