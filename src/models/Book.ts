export enum BookCategory {
    LITERATURE = 'Literature',
    ECONOMY = 'Economy',
    PSYCHOLOGY = 'Psychology - Life Skills',
    TEXTBOOK = 'Textbooks - References',
    FOREIGN_LANGUAGE = 'Foreign Language',
    INFORMATION_TECHNOLOGY = 'Information Technology',
    HISTORY = 'History',
    SCIENCE = 'Science - Engineering',
    CULTURE = 'Culture - Arts',
    OTHERS = 'Others'
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
  

  