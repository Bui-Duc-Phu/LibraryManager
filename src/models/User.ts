export class User {
    id!: number;                          // Mã người dùng
    fullName!: string;                   // Họ và tên
    contact!: [string,string,number|string]  // email,address,phone        use tuple    

    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }

}
