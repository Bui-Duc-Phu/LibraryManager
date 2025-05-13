export class Loan {
    private _id!: number;                          // Mã mượn sách
    private _userId!: number;                     // Mã người dùng mượn
    private _bookId!: number;                     // Mã sách được mượn
    private _borrowDate!: Date;                  // Ngày mượn
    private _returnDate!: Date;                  // Hạn trả
    private _status!: 'borrowed' | 'returned' | 'late'; // Trạng thái mượn
    
    constructor(

      id?: number,
      userId?: number,
      bookId?: number,
      borrowDate?: Date,
      returnDate?: Date,
      status?: 'borrowed' | 'returned' | 'late',
    ) {
      if (id) {
        this.setId(id);
      }
      if (userId) this.setUserId(userId);
      if (bookId) this.setBookId(bookId);
      if (borrowDate) this.setBorrowDate(borrowDate);
      if (returnDate) this.setReturnDate(returnDate);
      this.setStatus(status || 'borrowed');
    }
    
    // Getters
    get id(): number {
      return this._id;
    }
    
    get userId(): number {
      return this._userId;
    }
    
    get bookId(): number {
      return this._bookId;
    }
    
    get borrowDate(): Date {
      return this._borrowDate;
    }
    
    get returnDate(): Date {
      return this._returnDate;
    }
    
    get status(): 'borrowed' | 'returned' | 'late' {
      return this._status;
    }
    
    // Setters with validation
    private setId(id: number): void {
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error('ID phải là số nguyên dương');
      }
      this._id = id;
    }
    
    private setUserId(userId: number): void {
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error('User ID phải là số nguyên dương');
      }
      this._userId = userId;
    }
    
    private setBookId(bookId: number): void {
      if (!Number.isInteger(bookId) || bookId <= 0) {
        throw new Error('Book ID phải là số nguyên dương');
      }
      this._bookId = bookId;
    }
    
    private setBorrowDate(borrowDate: Date): void {
      if (!(borrowDate instanceof Date) || isNaN(borrowDate.getTime())) {
        throw new Error('Ngày mượn không hợp lệ');
      }
      this._borrowDate = borrowDate;
    }
    
    private setReturnDate(returnDate: Date): void {
      if (!(returnDate instanceof Date) || isNaN(returnDate.getTime())) {
        throw new Error('Ngày trả không hợp lệ');
      }
      
      if (this._borrowDate && returnDate < this._borrowDate) {
        throw new Error('Ngày trả phải sau ngày mượn');
      }
      
      this._returnDate = returnDate;
    }
    
    private setStatus(status: 'borrowed' | 'returned' | 'late'): void {
      if (!['borrowed', 'returned', 'late'].includes(status)) {
        throw new Error('Trạng thái không hợp lệ');
      }
      this._status = status;
    }
    
    // Public method to update status
    public updateStatus(newStatus: 'borrowed' | 'returned' | 'late'): void {
      this.setStatus(newStatus);
    }
    
    // Method to check if loan is late
    public isLate(): boolean {
      return this._status === 'late' || (
        this._status === 'borrowed' && 
        new Date() > this._returnDate
      );
    }
  }