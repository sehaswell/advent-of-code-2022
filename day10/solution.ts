import { sumValues } from "../utils/arrayStuff";
import { readAndSplit } from "../utils/fileUtils";
import { printNumericResult } from "../utils/prettyPrinting";

type Instruction = {
    V: number,
    numCycles: number
}

const parseLine = (line: string): Instruction => {
    const parts  = line.trim().split(' ');
    switch(parts[0]) { 
        case "noop":
            return {
                V: 0,
                numCycles: 1
            };
        case "addx":
            return {
                V: parseInt(parts[1]),
                numCycles: 2
            };
        default:
            console.error("Split fail: " + parts[0]);
            return { V: 0, numCycles: 0 };
    }
}

const partOne = (input: string[]) => {
    // The CPU has a single register, X, which starts with the value 1.
    let X=1;

    // need a cycle counter that also starts at 1
    let cycle = 1;

    let interestingValues = [];
    let signalStrengths = [];

    // a big ol' loop
    // two loops in fact
    // outer loop processes instructions and does adding

    input.forEach((line) => {
        // console.log(line);
        // parse line
        const instruction = parseLine(line);

        // set V and innerCycles

        // for innerCycles, increment cycles and check mod 40
        for(let i = 0; i<instruction.numCycles; i++) {
            if((cycle-20)%40 === 0) {
                // console.log("In cycle " + cycle + " value of X is " + X);
                // push a value
                signalStrengths.push(X*cycle);
                interestingValues.push(X);
            }
            cycle++;
        }

        // add V to X
        X+=instruction.V;
    });

    // has a value, V, which it adds after the inner loop
    // if noop, V = 0
    // innerCyclesForInstruction -> 2 for addV, 0 for noop

    // inner loop increments cycle counter and checks if current cycle is of interest

    console.log("Final value of X is " + X);
    console.log("Total cycles: " + cycle);

    return sumValues(signalStrengths);
}

const partTwo = (input: string[]) => {

    return 42;
}

const testInput: string[] = readAndSplit("day10/testInput.txt");
printNumericResult("Test answer 1 ", partOne(testInput), 0);
printNumericResult("Test answer 2 ", partTwo(testInput));

const largeTestInput: string[] = readAndSplit("day10/largeTestInput.txt");
printNumericResult("Large test answer 1 ", partOne(largeTestInput), 13140);
printNumericResult("Large test answer 2 ", partTwo(largeTestInput));

const input: string[] = readAndSplit("day10/input.txt");
printNumericResult("Read answer 1", partOne(input), 17020);
printNumericResult("Real answer 2", partTwo(input));