export enum BookCategory {
    VAN_HOC = 'Văn học',
    KINH_TE = 'Kinh tế',
    TAM_LY = 'Tâm lý - Kỹ năng sống',
    GIAO_KHOA = 'Giáo khoa - Tham khảo',
    NGOAI_NGU = 'Ngoại ngữ',
    CONG_NGHE = 'Công nghệ thông tin',
    LICH_SU = 'Lịch sử',
    KHOA_HOC = 'Khoa học - Kỹ thuật',
    VAN_HOA = 'Văn hóa - Nghệ thuật',
    KHAC = 'Khác'
}




export class Book {
    id!: number;                    // Mã sách
    title!: string;                 // Tên sách
    author!: string;                // Tác giả
    publisher!: string;            // Nhà xuất bản
    publishYear!: number;          // Năm xuất bản
    isbn!: string;                 // Mã ISBNß
    category!: BookCategory;        // Thể loại
    quantity!: number;             // Số lượng sách hiện có
    location!: string;             // Vị trí sách trong thư viện
    description?: string;         // Mô tả sách (tùy chọn)
    constructor(init?: Partial<Book>) {
      Object.assign(this, init);  // Gán giá trị khởi tạo nếu có
    }
  }
  

  