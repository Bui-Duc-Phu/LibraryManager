import { User } from "./models/User";


import * as readlineSync from 'readline-sync';
import { UserService } from "./services/UserService";
import { Book, BookCategory } from "./models/Book";
import { BookService } from "./services/BookService";
import { Loan } from "./models/Loan";
import { LoanService } from "./services/LoanService";





function addUser(){
    const fullName = readlineSync.question("Nhập tên người dùng: ");
    const email = readlineSync.question("Nhập email: ");
    const phone = readlineSync.question("Nhập số điện thoại: ");
    const address = readlineSync.question("Nhập địa chỉ: ");
    
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
    const title = readlineSync.question("Nhập tên sách: ");
    const author = readlineSync.question("Nhập tên tác giả: ");
    const publisher = readlineSync.question("Nhập tên nhà xuất bản: ");
    const publishYear = readlineSync.question("Nhập năm xuất bản: ");
    const isbn = readlineSync.question("Nhập mã ISBN: ");
    
    // Hiển thị các thể loại sách có sẵn
    console.log("\nCác thể loại sách có sẵn:");
    Object.values(BookCategory).forEach((category, index) => {
        console.log(`${index + 1}. ${category}`);
    });
    
    const categoryChoice = readlineSync.question("Chọn số thứ tự thể loại sách: ");
    const categoryIndex = parseInt(categoryChoice) - 1;
    const selectedCategory = Object.values(BookCategory)[categoryIndex];
    
    const quantity = readlineSync.question("Nhập số lượng: ");
    const location = readlineSync.question("Nhập vị trí: ");
    const description = readlineSync.question("Nhập mô tả: ");
    
    const newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
        publishYear: parseInt(publishYear),
        isbn: isbn,
        category: selectedCategory,
        quantity: parseInt(quantity),
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
    const bookId = readlineSync.question("Nhập mã sách: ");
    showAllUser();
    const userId = readlineSync.question("Nhập mã người dùng: ");
    const borrowDate = readlineSync.question("Nhập ngày mượn: ");
    const returnDate = readlineSync.question("Nhập ngày trả: ");

    const loan = new Loan(
        undefined,
        parseInt(bookId),
        parseInt(userId),
        new Date(borrowDate.split('/').reverse().join('-')),
        new Date(returnDate.split('/').reverse().join('-')),
        'borrowed'
    );

    LoanService.addLoan(loan)
    console.log("Mượn sách thành công\n");
}


function returnBook(){
    showAllBook();
    const bookId = readlineSync.question("Nhập id sách: ");
    const userId = readlineSync.question("Nhập id người dùng: ");

    try {
        LoanService.updateLoanStatus(parseInt(userId),parseInt(bookId), 'returned');
        console.log("Trả sách thành công\n");
    } catch (error: any) {
        console.log(error.message);
    }
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
        const choice = readlineSync.question("Nhập lựa chọn: ");
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


