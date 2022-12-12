import { readAndSplit } from "../utils/fileUtils";

type Range = {
    min: number;
    max: number;
}

const rangeContains = (a: Range, b: Range) => {
    return a.min <= b.min && a.max >= b.max;
};

const getRangeFromString = (rangeString: string[]): Range => {
    return ({ min: parseInt(rangeString[0]), max: parseInt(rangeString[1]) });
}

const conditionAppliesToLine = (line: string, condition: (a: Range, b: Range) => Boolean) => {
    const splitLine = line.split(',');
        const aString = splitLine[0].split("-");
        const bString = splitLine[1].split("-");
        
        const a = getRangeFromString(aString);
        const b = getRangeFromString(bString);

        // console.log("a: " + a.min + " " + a.max + " b: " + b.min + " " + b.max);
        return condition(a, b);
}

const partOne = (lines: string[]) => {
    const overlappyLines = lines.filter((line) => {
        return conditionAppliesToLine(line, (a, b) => rangeContains(a, b) || rangeContains(b, a));
    });

    return overlappyLines.length;
}

const rangesOverlap = (a: Range, b: Range) => {
    // one range contains an end of the other
    return ((a.min <= b.min && b.min <= a.max) ||
        (a.min <= b.max && b.max <= a.max) ||
        (b.min <= a.min && a.min <= b.max) ||
        (b.min <= a.max && a.max <= b.max));
};

const partTwo = (lines: string[]) => {
    return lines.filter((line) => conditionAppliesToLine(line, rangesOverlap)).length;
}

const testInput = readAndSplit("day4/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo(testInput));

const input: string[] = readAndSplit("day4/input.txt");
console.log("Answer 1 is " + partOne(input));
console.log("Answer 2 is " + partTwo(input));