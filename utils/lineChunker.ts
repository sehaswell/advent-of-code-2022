export const chunkLine = (line: string, chunkSize: number): string[] => {

    let chunks = [];
    const numChunks = line.length / chunkSize;
    // console.log("making " + numChunks + " chunks");

    // always allowing for extra
    for(let i = 0; i < numChunks; i++) {
        if(line.length === 0) continue;

        let thisChunk = line.slice(0, chunkSize);        
        chunks.push(thisChunk);
        line = line.slice(chunkSize);
    }
    
    if(line.length !== 0) console.error("Remainder: '" + line + "'");

    return chunks;
}