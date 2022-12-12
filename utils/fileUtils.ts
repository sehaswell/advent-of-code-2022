import { readFileSync } from "fs";

export const readAndSplit = (filePath: string) => {
    return readFileSync(filePath).toString().split('\n').filter(line => line.length!==0);
}