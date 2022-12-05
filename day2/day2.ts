
import { readFileSync } from "fs";

enum Shape {
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSORS = "SCISSORS"
}

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
const translateToShape = (input: string): Shape => {
    switch(input) {
        case 'A':
        case 'X':
            return Shape.ROCK;
        case 'B':
        case 'Y':
            return Shape.PAPER;
        case 'C':
        case 'Z':
            return Shape.SCISSORS;
    }
}

// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
const getShapeScore = (self: Shape): number => {
    switch(self) {
        case Shape.ROCK:
            return 1;
        case Shape.PAPER:
            return 2;
        case Shape.SCISSORS:
            return 3;
    }
}

// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
const getOutcomeScore = (opponent: Shape, self: Shape): number => {
    if (opponent === self) return 3;

    switch(opponent) {
        case Shape.ROCK:
            return self === Shape.PAPER ? 6 : 0;
        case Shape.PAPER:
            return self === Shape.SCISSORS ? 6 : 0;
        case Shape.SCISSORS:
            return self === Shape.ROCK ? 6 : 0;
    }
}

const inputString = readFileSync("day2/day2input.txt").toString();

const answer = inputString.split('\n')
    .map((strategyLine) => {
        const splitLine = strategyLine.split(' ');
        const opponent = translateToShape(splitLine[0]);
        const self = translateToShape(splitLine[1]);

        return getShapeScore(self) + getOutcomeScore(opponent, self);
    })
    .filter(x => !Number.isNaN(x))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Day 2 answer is " + answer);

// part 2

enum Result {
    WIN = 'WIN',
    LOSE = 'LOSE',
    DRAW = 'DRAW'
}

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const translateToResult = (input: string): Result => {
    switch(input) {
        case 'X':
            return Result.LOSE;
        case 'Y':
            return Result.DRAW;
        case 'Z':
            return Result.WIN;
    }
}

const getPlayForFix = (opponent: Shape, wantedResult: Result) => {
    if(wantedResult === Result.DRAW) return opponent;

    switch(opponent) {
        case Shape.ROCK:
            return wantedResult===Result.WIN ? Shape.PAPER : Shape.SCISSORS;
        case Shape.PAPER:
            return wantedResult===Result.WIN ? Shape.SCISSORS : Shape.ROCK;
        case Shape.SCISSORS:
             return wantedResult===Result.WIN ? Shape.ROCK : Shape.PAPER;
    }
}

const part2answer = inputString.split('\n')
    .map((strategyLine) => {
        const splitLine = strategyLine.split(' ');
        if(splitLine.length !== 2) return NaN;
        
        const opponent = translateToShape(splitLine[0].trim());
        const wantedResult = translateToResult(splitLine[1].trim());
        
        const self = getPlayForFix(opponent, wantedResult);
        return getShapeScore(self) + getOutcomeScore(opponent, self);
    })
    .filter(x => !Number.isNaN(x))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log("Part 2 answer: " + part2answer);
