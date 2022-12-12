import { readAndSplit } from "../utils/fileUtils";
import { chunkLine } from "../utils/lineChunker";

type CrateMap = {
    [key: number]: String[]
;}

type Instruction = {
    quantity: number;
    from: number;
    to: number;
}

const constructMap = (input: string[]): CrateMap => {
    let crateMap: CrateMap = {};

    // grab last line and use it to initialise stacks
    let lastLine = input.pop();
    const chunks: string[] = chunkLine(lastLine, 4);
    chunks.map((chunk: string) => {
        const number = parseInt(chunk.trim());
        crateMap[number] = [];
    });
    
    // for each line, find non-empty indexes and add what's there to the appropriate record
    input.reverse().map((line: string) => {
        if(line.trim().length === 0) return;

        const chunked = chunkLine(line, 4);
        // for each chunk, turn it into a number and push it to the indexed stack
        for(let i=0; i < chunked.length; i++) {
            if(chunked[i].trim().length === 0) continue;

            // remove non alpha
            const justLetter = chunked[i].trim().replace(/[^a-zA-Z]/g, '');
            crateMap[i+1].push(justLetter);
        }
    });

    // console.log(crateMap);

    return crateMap;
}

const getInstructions = (instructionInput: string[]): Instruction[] => {    
    return instructionInput.filter(x => x.trim()!=="")
        .map(line => {
            const words = line.split(" ");

            return {
                quantity: parseInt(words[1]),
                from: parseInt(words[3]),
                to: parseInt(words[5])
            }
        }
    );
}

const applyInstructions = (instructions: Instruction[], crateLayout: CrateMap) => {
    instructions.map((instruction: Instruction) => {
        for(let i=0; i < instruction.quantity; i++) {
            crateLayout[instruction.to].push(crateLayout[instruction.from].pop())
        }

    });

    // console.log(crateLayout);
    return crateLayout;
}

const partOne = (input: string[]) => {
    while(input[0].trim() === "") {
        console.log("Removing empty line from start of input");
        input.shift();
    }

    // split file lines at empty line
    const emptyLineIndex = input.findIndex((x) => x.trim().length === 0);

    const initialMap = constructMap(input.slice(0, emptyLineIndex));

    const instructions = getInstructions(input.slice(emptyLineIndex + 1));
    const newMap: CrateMap = applyInstructions(instructions, initialMap);

    let answer = "";
    // cheaty? How to have iterable keys?
    for(let i = 0; i < 10; i++ ) {
        if(newMap[i] && newMap[i].length > 0) {
            answer += (newMap[i].slice(-1));
        }
    }
    return answer;
};

const applyInstructionsPart2 = (instructions: Instruction[], crateLayout: CrateMap) => {
    instructions.map((instruction: Instruction) => {
        const fromSplicePoint = (crateLayout[instruction.from].length) - instruction.quantity;
        const moving = crateLayout[instruction.from].splice(fromSplicePoint);

        crateLayout[instruction.to] = [...crateLayout[instruction.to], ...moving];
    });

    return crateLayout;
};

const partTwo = (input: string[]) => {
    while(input[0].trim() === "") {
        console.log("Removing empty line from start of input");
        input.shift();
    }

    // split file lines at empty line
    const emptyLineIndex = input.findIndex((x) => x.trim().length === 0);

    const initialMap = constructMap(input.slice(0, emptyLineIndex));

    const instructions = getInstructions(input.slice(emptyLineIndex + 1));
    const newMap: CrateMap = applyInstructionsPart2(instructions, initialMap);

    let answer = "";
    for(let i = 0; i < 10; i++ ) {
        if(newMap[i] && newMap[i].length > 0) {
            answer += (newMap[i].slice(-1));
        }
    }
    return answer;
};

const testInput: string[] = readAndSplit("day5/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo(testInput));

const input: string[] = readAndSplit("day5/input.txt", false);
console.log("Answer 1 is " + partOne(input));
console.log("Answer 2 is " + partTwo(input));