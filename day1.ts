import { readFileSync } from "fs";
import { compareNumbers } from "./utils/compareNumbers";

const getSortedLoads = (input: string): number[] => {
    return input.split('\n\n')
        .map((elfLoad: string) =>
            elfLoad.split('\n')
                .map((numberString: string) => parseInt(numberString.trim()))
                .filter(x => !Number.isNaN(x))
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        )
        .sort(compareNumbers);
}

const getHighestLoad = (sortedLoads: number[]) => {
    return sortedLoads[sortedLoads.length - 1];
}

const getTopThreeSum = (sortedLoads: number[]) => {
    const lastThree = sortedLoads.splice(sortedLoads.length - 3, sortedLoads.length - 1);
    return lastThree.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const inputFile = readFileSync("day1input.txt");
const sortedLoads = getSortedLoads(inputFile.toString());

console.log("Answer is: " + getHighestLoad(sortedLoads));

console.log("Part two answer is: " + getTopThreeSum(sortedLoads));