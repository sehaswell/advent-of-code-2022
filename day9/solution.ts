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

const coordinateAsString = (coord: Coordinate) => {
    return `(${coord.x},${coord.y})`
};

const shouldMoveInDirection = (h: Coordinate, t: Coordinate, direction: string) => {
    if(h.y === t.y && h.x === t.x) { return false; }

    switch(direction) {
        case "U":
            if( h.y === t.y ) {return false;}
            if( h.y < t.y ) {return false;}
            break;
        case "D":
            if( h.y === t.y ) {return false;}
            if( h.y > t.y ) {return false;}
            break;
        case "R":
            if( h.x === t.x ) {return false;}
            if( h.x < t.x ) {return false;}
            break;
        case "L":
            if( h.x === t.x ) {return false;}
            if( h.x > t.x ) {return false;}
            break;
        default:
            console.log("Unrecognised direction " + direction);
            return false;
    }

    return true;
};

const updateT = (newH: Coordinate, prevT: Coordinate, directions: string[]): {newT: Coordinate, directionsMoved: string[]} => {
    let newT: Coordinate = prevT;
    if(isTouching(newH, prevT) || directions.length === 0) {
        return {newT: prevT, directionsMoved: []};
    }

    // get new position for T
    // do we necessarily want to move the same way the other one did? Probably? NO

    // TODO: determine directions more cleverly

    //["U", "D", "L", "R"].filter(x => shouldMoveInDirection(newH, prevT, x));
    const xMove = shouldMoveInDirection(newH, prevT, "R") ? "R" : (shouldMoveInDirection(newH, prevT, "L") ? "L" : undefined);
    const yMove = shouldMoveInDirection(newH, prevT, "U") ? "U" : (shouldMoveInDirection(newH, prevT, "D") ? "D" : undefined);

    if( xMove ) { newT = moveOne(prevT, xMove); }
    if( yMove ) { newT = moveOne(newT, yMove); }

    return {
        newT: newT,
        directionsMoved: [xMove, yMove]
    };
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
            positionT = updateT(positionH, positionT, [direction]).newT;
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
    const numKnots = 10;
    let knotPositions: Coordinate[] = [];
    for(let k = 0; k < numKnots; k++) {
        knotPositions.push({x: 0, y: 0});
    }

    let seenPoistionsOfT = new Set<string>();
    seenPoistionsOfT.add(coordinateAsString(knotPositions[numKnots-1]));

    // for each row
    input.map((instruction: string) => {
        const parts = instruction.trim().split(' ');
        const direction = parts[0];
        const numSteps = parseInt(parts[1]);
        
        // for num steps, do step and check where T should be
        for(let step = 1; step <= numSteps; step++) {
            knotPositions[0] = moveOne(knotPositions[0], direction);

            let lastDirections = [direction];
            // for each knot, update its position based on the previous
            // do I need to track all of them? possibly not, but it's easier
            for(let k = 1; k < numKnots; k++) {
                // need to work out which way the previous one moved for myself
                const update = updateT(knotPositions[k-1], knotPositions[k], lastDirections);
                knotPositions[k] = update.newT;
                lastDirections = update.directionsMoved;
            }
            seenPoistionsOfT.add(coordinateAsString(knotPositions[numKnots-1]));
        }
    });

    // console.log(seenPoistionsOfT);
    return seenPoistionsOfT.size;
};

const printResult = (name: string, result: number, expected: number) => {    
    console.log(name + " is " + result + (result===expected ? " CORRECT" : " INCORRECT"));
};

const testInput: string[] = readAndSplit("day9/testInput.txt");
printResult("Test answer 1 ", partOne(testInput), 13);
printResult("Test answer 2 ", partTwo(testInput), 1);

const largeTestInput: string[] = readAndSplit("day9/largeTestInput.txt");
printResult("Large test answer 1 ", partOne(largeTestInput), 88); // not from AoC
printResult("Large test answer 2 ", partTwo(largeTestInput), 36);

const input: string[] = readAndSplit("day9/input.txt");
printResult("Read answer 1", partOne(input), 6642);
console.log("Real answer 2 is " + partTwo(input)); //2765