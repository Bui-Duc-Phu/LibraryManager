import { User } from '../models/User';
import { LoanService } from '../services/LoanService';
import { UserService } from '../services/UserService';

const loans = LoanService.getLoans();
console.log(LoanService.generateNewLoanId(loans));