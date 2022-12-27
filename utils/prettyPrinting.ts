export const printNumericResult = (name: string, result: number, expected?: number) => {    
    console.log(name + " is " + result + (expected ? (result===expected ? " CORRECT" : " INCORRECT") : ""));
};

export const printStringResult = (name: string, result: string, expected?: string) => {    
    console.log(name + " is " + result + (expected ? (result===expected ? " CORRECT" : " INCORRECT") : ""));
};