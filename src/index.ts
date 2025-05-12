import { User } from "./models/User";


import * as readlineSync from 'readline-sync';






while (true) {
    console.log("1. Đăng ký tài khoản");
    console.log("2. Đăng nhập");
    console.log("0. Thoát");
    const choice = readlineSync.question("Nhập lựa chọn: ");
    switch (choice) {
        case "0":
            console.log("Thoát chương trình");
            process.exit(0)
            break;

        case "1":
        
            break;  
        case "2":
        
        default:
            console.log("Lựa chọn không hợp lệ");
            break;
    }
}


const books = [
    { id: 1, name: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 2, name: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài' },
    { id: 3, name: 'Lão Hạc', author: 'Nam Cao' }
  ];
  
  console.table(books);
  

