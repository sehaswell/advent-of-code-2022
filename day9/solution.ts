import { readAndSplit } from "../utils/fileUtils";

// if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:

// there are input instructions and movement steps
// movement steps are nested inside input instructions

// don't need a model of whole thing, just a set of co-ordinates for H & T that get updated
// and a set of co-ordinates at correct point (when is this?)

// add start position to set
// when tail moves, add new co-ordinate to set

// up/down = y, left/right = x
type Coordinate = {
    x: number,
    y: number
}

const moveOne = (coordinate: Coordinate, direction: string): Coordinate => {
    // console.log("Move one " + direction);
    // switch on direction to determine what changes
    switch(direction) {
        case "R":
            // add one to x
            return ({
                ...coordinate,
                x: coordinate.x + 1
            });
        case "L":
            // take one from x
            return ({
                ...coordinate,
                x: coordinate.x - 1
            });
        case "U":
            // add one to y
            return ({
                ...coordinate,
                y: coordinate.y + 1
            });
        case "D":
            // take one from y
            return ({
                ...coordinate,
                y: coordinate.y - 1
            });
        default:
            console.log("Unrecognised direction: " + direction);
            break;
    }
    // if new position is nearing INTMAX then we have a problem
    console.log("Shouldn't get here");
};

// the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching):
const isTouching = (h: Coordinate, t: Coordinate): boolean => {
    // console.log("Comparing:");
    // console.log(h);
    // console.log(t);
    const xDiff = Math.abs(h.x - t.x);
    const yDiff = Math.abs(h.y - t.y);

    if(xDiff <= 1 && yDiff === 0) return true; 
    if(xDiff === 0 && yDiff <= 1) return true;

    // now catch diagonals
    if(xDiff===1 && yDiff===1) {
        return true;
    }

    return false;
}

const getSecondDirection = (h: Coordinate, t: Coordinate, direction: string): string => {
    if(h.x === t.x || h.y === t.y) {
        // console.log(h);
        // console.log(t);
        // console.log("Same in one axis ");
        return undefined;
    }
    
    // we know one direction so we only need to check the other axis
    switch(direction) {
        case "R":
        case "L":
            // figure out if t needs to go up or down
            if(h.y >= t.y) { return "U"; }
            return "D";
        case "U":
        case "D":
            // figure out if t needs to go left or right
            if(h.x >= t.x) { return "R"; }
            return "L";
        default:
            console.log("Unrecognised direction: " + direction);
            break;
    }
    console.log("Shouldn't get here");
}

const coordinateAsString = (coord: Coordinate) => {
    return `(${coord.x},${coord.y})`
};

const updateT = (newH: Coordinate, prevT: Coordinate, direction: string) => {
    let newT: Coordinate = prevT;
    if(isTouching(newH, prevT)) {
        return prevT;
        // console.log("Touching ");
        // console.log(positionH);
        // console.log(positionT);
        // console.log("---");
    }

    // console.log("Not touching ");
    // console.log(positionH);
    // console.log(positionT);
    // console.log("---");

    // get new position for T
    const secondDirection = getSecondDirection(newH, prevT, direction);
    // once we know the directions, then just use moveOne
    // console.log("direction is " + direction);
    // console.log("second direction is " + secondDirection);
    newT = moveOne(prevT, direction);
    if( secondDirection ) {
        newT = moveOne(newT, secondDirection);
    }
    return newT;
};

const partOne = (input: string[]) => {
    let positionH = {x: 0, y: 0};
    let positionT = {x: 0, y: 0};
    let seenPoistionsOfT = new Set<string>();
    seenPoistionsOfT.add(coordinateAsString(positionT));

    // for each row
    input.map((instruction: string) => {
        const parts = instruction.trim().split(' ');
        const direction = parts[0];
        const numSteps = parseInt(parts[1]);
        
        // for num steps, do step and check where T should be
        for(let step = 1; step <= numSteps; step++) {
            // console.log("--- Start of step ---");
            
            // console.log(positionH);
            // console.log(positionT);
            // update position H for this step
            positionH = moveOne(positionH, direction);
            positionT = updateT(positionH, positionT, direction);
            // store new position for T
            seenPoistionsOfT.add(coordinateAsString(positionT));
            // console.log("--- End of step ---");
        }
        // console.log("--- End of instruction ---");
    });

    // console.log("Seen positions of T");
    // console.log(seenPoistionsOfT);

    return seenPoistionsOfT.size;
};

const partTwo = (input: string[]) => {

    // same as part 1 but go through chain of tails and only store on the last one


    return "the answer to part two";
};

const testInput: string[] = readAndSplit("day9/testInput.txt");
console.log("Test answer 1 is " + partOne(testInput));
console.log("Test answer 2 is " + partTwo(testInput));

const input: string[] = readAndSplit("day9/input.txt");
console.log("Real answer 1 is " + partOne(input));
console.log("Real answer 2 is " + partTwo(input));