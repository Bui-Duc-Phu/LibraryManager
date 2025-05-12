import path from 'path';
import { Book } from '../models/Book';
import { readFileJson ,writeFileJson} from '../Utils/Util';


export class BookService {
 
    private static readonly DATA_DIR = path.join(process.cwd(), 'src', 'data');
    private static readonly BOOK_FILE = path.join(BookService.DATA_DIR, 'Book.json');




    public static addBook(book: Book): Book {
        const books = readFileJson<Book>(this.DATA_DIR,this.BOOK_FILE);
        books.push(book);
        writeFileJson(books,this.DATA_DIR,this.BOOK_FILE);
        return book;
    }
    
    
}