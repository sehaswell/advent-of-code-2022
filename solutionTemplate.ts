import { readAndSplit } from "./utils/fileUtils";

const partOne = (input: string[]) => {
    return "the answer to part one";
};

const partTwo = (input: string[]) => {
    return "the answer to part two";
};

const testInput: string[] = readAndSplit("day7/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo(testInput));

const input: string[] = readAndSplit("day7/input.txt");
console.log("Real answer 1 is " + partOne(input));
console.log("Real answer 2 is " + partTwo(input));