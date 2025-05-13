import readlineSync from 'readline-sync';


function askNonEmpty(prompt: string, type: 'string' | 'number',isEmail?: boolean){
    let answer: string | number;
    
    do {
        if (type === 'number') {
            answer = readlineSync.questionInt(prompt);
            if (isNaN(answer)) {
                console.log("Vui lòng nhập một số hợp lệ.");
                continue;
            }
        } 
        else if(isEmail){
            answer = readlineSync.questionEMail(prompt);
            if (!answer.trim()) {
                console.log("Không được để trống. Vui lòng nhập lại.");
                continue;
            }
        }else {
            answer = readlineSync.question(prompt);
            if (!answer.trim()) {
                console.log("Không được để trống. Vui lòng nhập lại.");
                continue;
            }
        }
    } while (type === 'number' ? isNaN(answer as number) : !(answer as string).trim());

    return type === 'number' ? answer as number : answer as string;
}

export {  askNonEmpty };