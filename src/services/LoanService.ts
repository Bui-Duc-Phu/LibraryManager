import { Loan } from "../models/Loan";
import { MyPaths } from "../Utils/MyPaths";
import { readFileJSON, writeFileJSON } from "../Utils/Util";



export class LoanService {

    public static addLoan(loan: Loan): Loan {
        const loans = readFileJSON<Loan>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
      
        if(!loan.id){
            const newId = loans.length > 0 ? Math.max(...loans.map(l => l.id)) + 1 : 1;
            loan = new Loan(
                newId,
                loan.userId,
                loan.bookId, 
                loan.borrowDate,
                loan.returnDate,
                loan.status
            );
        }

        loans.push(loan);
        writeFileJSON(loans, MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loan;
    }
   
    public static isLoanExists(id: number, bookId: number): boolean {
        const loans = readFileJSON<Loan>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loans.some(loan => loan.id === id || loan.bookId === bookId);
    }
    
    public static getLoans(): any {
        const loans = readFileJSON<Loan>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loans;
    }
    

    
    
}

