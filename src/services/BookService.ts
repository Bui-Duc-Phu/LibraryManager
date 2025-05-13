import path from 'path';
import { Book } from '../models/Book';
import { readFileJSON ,writeFileJSON} from '../Utils/Util';
import { MyPaths } from '../Utils/MyPaths';


export class BookService {
 
    public static addBook(book: Book): Book {
        const books = readFileJSON<Book>(MyPaths.DATA_DIR,MyPaths.BOOK_FILE);
      
        if(!book.id){
            book.id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
        }
        if(this.isBookExists(book.id,book.isbn)){
            throw new Error('Book already exists');
        }
        books.push(book);
        writeFileJSON(books,MyPaths.DATA_DIR,MyPaths.BOOK_FILE);
        return book;
    }
    

    public static isBookExists(id: number, isbn: string): boolean {
        const books = readFileJSON<Book>(MyPaths.DATA_DIR,MyPaths.BOOK_FILE);
        return books.some(book => book.id === id || book.isbn === isbn);
    }

    public static getBooks(): any {
        const books = readFileJSON<Book>(MyPaths.DATA_DIR,MyPaths.BOOK_FILE);
        return books;
    }

    public static getBookById(id: number): Book | null {
        const books = readFileJSON<Book>(MyPaths.DATA_DIR,MyPaths.BOOK_FILE);
        return books.find(book => book.id === id) || null;
    }
    
}