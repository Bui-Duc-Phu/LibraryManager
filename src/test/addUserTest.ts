import { User } from '../models/User';
import { UserService } from '../services/UserService';



// Tạo một user mới để test
const testUser = new User({
    fullName: "Nguyen Van bb",
    contact: ["nguyenvana@exsdsdample.com", "123 Street","097432222826577"]
});


const addedUser = UserService.addUser(testUser);

// // // In thông tin user đã thêm
console.log('User đã được thêm thành công:');
// console.log('ID:', addedUser.id);
// console.log('Họ tên:', addedUser.fullName);
// console.log('Email:', addedUser.email);
// console.log('Số điện thoại:', addedUser.phone);
// console.log('Địa chỉ:', addedUser.address);
// console.log('Ngày sinh:', addedUser.dob);
// console.log('Trạng thái:', addedUser.status); 


