import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { readFileJson ,writeFileJson} from '../Utils/Util';
export class UserService {


    private static readonly DATA_DIR = path.join(process.cwd(), 'src', 'data');
    private static readonly USER_FILE = path.join(UserService.DATA_DIR, 'User.json');


    public static addUser(user: User): User {
        const users = readFileJson<User>(this.DATA_DIR,this.USER_FILE);
        
        // Generate new ID if not providedß
        if (!user.id) {
            user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        }
        users.push(user);
        writeFileJson(users,this.DATA_DIR,this.USER_FILE);
        return user;
    }

    public static getUsers(): User[] {
        const users = readFileJson<User>(this.DATA_DIR,this.USER_FILE);   
        return users;
    }

    public static getUserById(id: number): User | null {
        const users = readFileJson<User>(this.DATA_DIR,this.USER_FILE);
        return users.find(user => user.id === id) || null;
    }
  
} 