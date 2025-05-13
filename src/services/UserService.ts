import { User } from "../models/User";
import { readFileJSON, writeFileJSON } from "../Utils/Util";
import { MyPaths } from "../Utils/MyPaths";

export class UserService {
    private static getUsersFromFile(): User[] {
        return readFileJSON<User>(MyPaths.DATA_DIR, MyPaths.USER_FILE);
    }

    private static saveUsers(users: User[]): void {
        writeFileJSON(users, MyPaths.DATA_DIR, MyPaths.USER_FILE);
    }

    private static generateNewUserId(users: User[]): number {
        return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    }

    private static isUserExists(id: number, email: string, phone: string | number): boolean {
        const users = this.getUsersFromFile();
        return users.some(user => 
            user.id === id || 
            user.contact[0] === email || 
            user.contact[2] === phone.toString()
        );
    }

    public static addUser(user: User): User {
        const users = this.getUsersFromFile();
        
        if (!user.id) {
            user.id = this.generateNewUserId(users);
        }

        if (this.isUserExists(user.id, user.contact[0], user.contact[2])) {
            throw new Error('User already exists');
        }

        users.push(user);
        this.saveUsers(users);
        return user;
    }

    public static getUsers(): User[] {
        return this.getUsersFromFile();
    }

    public static getUserById(id: number): User | null {
        const users = this.getUsersFromFile();
        return users.find(user => user.id === id) || null;
    }
} 