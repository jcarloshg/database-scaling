import { User } from '../../../shared/database/user.model';

// Repository interface

export interface IUserRepository {
    createUser(data: { username: string; email: string; password_hash: string; }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
