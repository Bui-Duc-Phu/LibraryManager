import readlineSync from 'readline-sync';

function askNonEmptyQuestion(prompt: string): string {
    let answer = '';
    do {
        answer = readlineSync.question(prompt);
        if (!answer.trim()) {
            console.log("❌ Không được để trống. Vui lòng nhập lại.");
        }
    } while (!answer.trim());

    return answer;
}

export default askNonEmptyQuestion;