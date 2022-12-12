export const chunkLine = (line: string, chunkSize: number) => {
    if( line.length%chunkSize !== 0) {
        console.error("WONKY CHUNKING ALERT");
    }

    let chunks = [];
    const numChunks = line.length / chunkSize;
    for(let i = 0; i < numChunks; i++) {
        let thisChunk = line.slice(0, chunkSize);        
        chunks.push(thisChunk.trim());
        line = line.slice(chunkSize);
    }
    return chunks;
}