import { readFileSync } from "fs";

export const readAndSplit = (filePath: string, skipEmpty=true) => {
    return readFileSync(filePath).toString().split('\n').filter(line => (line.length!==0 || !skipEmpty));
}