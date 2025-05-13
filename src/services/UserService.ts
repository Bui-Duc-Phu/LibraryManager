import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { readFileJSON ,writeFileJSON} from '../Utils/Util';
import { MyPaths } from '../Utils/MyPaths';

export class UserService {

    public static addUser(user: User): User {
        const users = readFileJSON<User>(MyPaths.DATA_DIR, MyPaths.USER_FILE);
        if (!user.id) {
            user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        }
        if(this.isUserExists(user.id, user.contact[0], user.contact[2])){
            throw new Error('User already exists');
        }
        users.push(user);
        writeFileJSON(users, MyPaths.DATA_DIR, MyPaths.USER_FILE);
        return user;
    }

    public static isUserExists(id: number, email: string, phone: number|string): boolean {
        const users: Array<any> = readFileJSON<any>(MyPaths.DATA_DIR, MyPaths.USER_FILE);
        return users.some(user => {
            if (user.id === id) return true;
            const userEmail = user.contact ? user.contact[0] : user.email;
            const userPhone = user.contact ? user.contact[2] : user.phone;
            return userEmail === email || userPhone === phone;
        });
    }

    public static getUsers(): any {
        const users = readFileJSON<User>(MyPaths.DATA_DIR, MyPaths.USER_FILE);   
        return users;
    }

    public static getUserById(id: number): User | null {
        const users = readFileJSON<User>(MyPaths.DATA_DIR, MyPaths.USER_FILE);
        return users.find(user => user.id === id) || null;
    }
  
} 