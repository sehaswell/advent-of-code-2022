import { readAndSplit } from "./utils/fileUtils";
import { printStringResult } from "./utils/prettyPrinting";

const partOne = (input: string[]) => {
    return "the answer to part one";
};

const partTwo = (input: string[]) => {
    return "the answer to part two";
};

const testInput: string[] = readAndSplit("day/testInput.txt");
printStringResult("Test answer 1", partOne(testInput));
printStringResult("Test answer 2", partTwo(testInput));

const input: string[] = readAndSplit("day/input.txt");
printStringResult("Real answer 1", partOne(input));
printStringResult("Real answer 2", partTwo(input));