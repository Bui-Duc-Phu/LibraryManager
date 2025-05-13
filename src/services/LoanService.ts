import { Loan } from "../models/Loan";
import { MyPaths } from "../Utils/MyPaths";
import { readFileJSON, writeFileJSON } from "../Utils/Util";



export class LoanService {

    public static addLoan(loan: Loan): Loan {
        const loans = readFileJSON<any>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        
        // Generate new ID if not provided
        const maxId = loans.length > 0 ? Math.max(...loans.map(l => l.id || 0)) : 0;
        const newId = loan.id || maxId + 1;

        // Create a new loan object with the same properties
        const newLoan = new Loan(
            newId,
            loan.userId,
            loan.bookId,
            loan.borrowDate,
            loan.returnDate,
            loan.status
        );

        // Add the loan to the list
        loans.push({
            id: newLoan.id,
            userId: newLoan.userId,
            bookId: newLoan.bookId,
            borrowDate: newLoan.borrowDate,
            returnDate: newLoan.returnDate,
            status: newLoan.status
        });
        
        // Save to file
        writeFileJSON(loans, MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        
        return newLoan;
    }
   
    public static isLoanExists(id: number, bookId: number): boolean {
        const loans = readFileJSON<Loan>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loans.some(loan => loan.id === id || loan.bookId === bookId);
    }
    
    public static getLoans(): any {
        const loans = readFileJSON<Loan>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loans;
    }

    public static updateLoanStatus(userId: number, bookId: number, newStatus: 'borrowed' | 'returned' | 'late'): void {
        const loans = readFileJSON<any>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        const loanIndex = loans.findIndex(loan => loan.userId === userId && loan.bookId === bookId);
        
        if (loanIndex === -1) {
            throw new Error('Không tìm thấy phiếu mượn sách');
        }

        loans[loanIndex].status = newStatus;
        writeFileJSON(loans, MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
    }
    

    
    
}

