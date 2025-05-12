export class Loan {
    id!: number;                          // Mã mượn sách
    userId!: number;                     // Mã người dùng mượn
    bookId!: number;                     // Mã sách được mượn
    borrowDate!: Date;                  // Ngày mượn
    returnDate!: Date;                  // Hạn trả
    actualReturn?: Date;               // Ngày trả thực tế (tùy chọn)
    status!: 'borrowed' | 'returned' | 'late'; // Trạng thái mượn
    fine!: number;                      // Tiền phạt (nếu có)
  
    constructor(init?: Partial<Loan>) {
      Object.assign(this, init);
    }
  }
  