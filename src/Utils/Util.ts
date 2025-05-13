import fs from 'fs';

function writeFileJSON(data:any,dirPath:string,filePath:string):void{
    // check if the directory exists
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

}


function readFileJSON<T>(dirPath:string,filePath:string): T[] {
 
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        return [] as T[];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function addDataOnFileJSON(data:any,dirPath:string,filePath:string):void{

    
}


export {writeFileJSON,readFileJSON};