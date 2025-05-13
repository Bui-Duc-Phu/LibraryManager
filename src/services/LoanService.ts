import { Loan } from "../models/Loan";
import { MyPaths } from "../Utils/MyPaths";
import { readFileJSON, writeFileJSON } from "../Utils/Util";

export class LoanService {
    private static getLoansFromFile(): Loan[] {
        const loansData = readFileJSON<any>(MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
        return loansData.map(loanData => new Loan(
            loanData._id,
            loanData._userId,
            loanData._bookId,
            new Date(loanData._borrowDate),
            new Date(loanData._returnDate),
            loanData._status
        ));
    }

    private static saveLoans(loans: Loan[]): void {
        writeFileJSON(loans, MyPaths.DATA_DIR, MyPaths.LOAN_FILE);
    }

    public static generateNewLoanId(loans: Loan[]): number {
        console.log(loans);
        const existingIds = loans
            .map(l => l.id)
            .filter(id => !isNaN(id) && id !== undefined);
        return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    }

    private static findLoanIndex(userId: number, bookId: number): number {
        const loans = this.getLoansFromFile();
        console.log(loans);
        console.log(userId, bookId);
        console.log(loans[0].userId, loans[0].bookId);
        return loans.findIndex(loan => {  return loan.compareIds(userId,bookId)});
    }

    public static addLoan(loan: Loan): Loan {
        const loans = this.getLoansFromFile();
        
        const newLoan = new Loan(
            this.generateNewLoanId(loans),
            loan.userId,
            loan.bookId,
            loan.borrowDate,
            loan.returnDate,
            loan.status
        );
        loans.push(newLoan);
        this.saveLoans(loans);
        return newLoan;
    }

    public static getLoans(): Loan[] {
        return this.getLoansFromFile();
    }

    public static updateLoanStatus(_userId: number, _bookId: number, newStatus: 'borrowed' | 'returned' | 'late'): void {
        const loans = this.getLoansFromFile();
        const loanIndex = this.findLoanIndex(_userId, _bookId);
        
        if (loanIndex === -1) {
            throw new Error('Không tìm thấy phiếu mượn sách');
        }

        const loan = loans[loanIndex];
        const updatedLoan = new Loan(
            loan.id,
            loan.userId,
            loan.bookId,
            loan.borrowDate,
            loan.returnDate,
            newStatus
        );

        loans[loanIndex] = updatedLoan;
        this.saveLoans(loans);
    }
}

