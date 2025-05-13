import { User } from "./models/User";


import { UserService } from "./services/UserService";
import { Book, BookCategory } from "./models/Book";
import { BookService } from "./services/BookService";
import { Loan } from "./models/Loan";
import { LoanService } from "./services/LoanService";
import { askNonEmpty } from "./Utils/askNonEmptyQuestion";





function addUser(){
    const fullName = askNonEmpty("Nhập tên người dùng: ", "string") as string;
    const email = askNonEmpty("Nhập email: ", "string",true) as string;
    const phone = askNonEmpty("Nhập số điện thoại: ", "string") as string;
    const address = askNonEmpty("Nhập địa chỉ: ", "string") as string;
    
    const user = new User({
        fullName: fullName,
        contact: [email,address,phone]
    });

    UserService.addUser(user);
    console.log("Thêm người dùng thành công");
}

function showAllUser(){
    const users = UserService.getUsers();
    const fotmatData = users.map((user:any)=>{
        let [email,address,phone] = user.contact;
        return {
            id: user.id,
            fullName: user.fullName,
            email: email,
            address: address,
            phone: phone
        }
    })
    console.table(fotmatData);
    console.log("\n");
}

function addBook(){
    const title = askNonEmpty("Nhập tên sách: ", "string") as string;
    const author = askNonEmpty("Nhập tên tác giả: ", "string") as string;
    const publisher = askNonEmpty("Nhập tên nhà xuất bản: ", "string") as string;
    const publishYear = askNonEmpty("Nhập năm xuất bản: ", "number") as number;
    const isbn = askNonEmpty("Nhập mã ISBN: ", "string") as string;
    
    // Hiển thị các thể loại sách có sẵn
    console.log("\nCác thể loại sách có sẵn:");
    Object.values(BookCategory).forEach((category, index) => {
        console.log(`${index + 1}. ${category}`);
    });
    
    const categoryChoice = askNonEmpty("Chọn số thứ tự thể loại sách: ", "number") as number;
    const selectedCategory = Object.values(BookCategory)[categoryChoice-1];
    
    const quantity = askNonEmpty("Nhập số lượng: ", "number") as number;
    const location = askNonEmpty("Nhập vị trí: ", "string") as string;
    const description = askNonEmpty("Nhập mô tả: ", "string") as string;
    
    const newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
        publishYear: publishYear,
        isbn: isbn,
        category: selectedCategory,
        quantity: quantity,
        location: location,
        description: description
    });
    
    BookService.addBook(newBook);
    console.log("Thêm sách thành công\n");
}

function showAllBook(){
    const books = BookService.getBooks();

    const fotmatData = books.map((book:any)=>{
        return {
            title: book.title,
            author: book.author,
            category: book.category,
            quantity: book.quantity,
            location: book.location,
        }
    })
    console.table(fotmatData);
    console.log("\n");
}



function borrowBook(){
    showAllBook()
    const bookId = askNonEmpty("Nhập mã sách: ", "number") as number;
    showAllUser();
    const userId = askNonEmpty("Nhập mã người dùng: ", "number") as number;
    const borrowDate = askNonEmpty("Nhập ngày mượn: ", "string") as string;
    const returnDate = askNonEmpty("Nhập ngày trả: ", "string") as string;

    const loan = new Loan(
        undefined,
        bookId,
        userId,
        new Date(borrowDate.split('/').reverse().join('-')),
        new Date(returnDate.split('/').reverse().join('-')),
        'borrowed'
    );

    LoanService.addLoan(loan)
    console.log("Mượn sách thành công\n");
}


function returnBook(){
    showAllBook();
    const bookId = askNonEmpty("Nhập id sách: ", "number") as number;
    const userId = askNonEmpty("Nhập id người dùng: ", "number") as number;

    LoanService.updateLoanStatus(userId, bookId, 'returned');
    console.log("Trả sách thành công\n");
    
}

function showAllLoan(){
    const loans = LoanService.getLoans();
    console.table(loans);
    console.log("\n");
}

function main() {

    while (true) {
        console.log("1. add user");
        console.log("2. show All user");
        console.log("3. addBook");
        console.log("4. show All Book");
        console.log("5. Mượn Sách");
        console.log("6. Trả Sách");
        console.log("7. Hiển thị phiếu mượn sách");
        console.log("0. Thoát");
        const choice = askNonEmpty("Nhập lựa chọn: ", "string") as string;
        switch (choice) {
            case "0":
                console.log("Thoát chương trình");
                process.exit(0)
                break;
            case "1":
                addUser();
                break;
            case "2":
                showAllUser();
                break;
            case "3":
                addBook();
                break;
            case "4":
                showAllBook();
                break;
            case "5":
                borrowBook();
                break;
            case "6":
                returnBook();
                break;
            case "7":
                showAllLoan();
                break;
            default:
                console.log("Lựa chọn không hợp lệ");
                break;
        }
    }

}

main();


