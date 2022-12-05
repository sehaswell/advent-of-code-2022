import { readFileSync } from "fs";
import { compareNumbers } from "./utils/compareNumbers";

const getHighestLoad = (input: string) => {
    const splitByElf = input.split('\n\n');
    const numElves = splitByElf.length;

    const added  = splitByElf.map((elfLoad: string) =>
        elfLoad.split('\n')
            .map((numberString: string) => parseInt(numberString.trim()))
            .filter(x => !Number.isNaN(x))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    )
    .sort(compareNumbers);

    return added[numElves-1];
}

const inputFile = readFileSync("inputDay1.txt");
console.log("Answer is: " + getHighestLoad(inputFile.toString()));