// user-repository.postgresql
import { User } from '../../../shared/database/user.model';
import { IUserRepository } from '../../models/db/user.repository';


export class UserRepositoryPostgresql implements IUserRepository {
    async createUser(data: { username: string; email: string; password_hash: string; }): Promise<User> {
        const user = await User.create({
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
        });
        return user.toJSON() as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user ? (user.toJSON() as User) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await User.findOne({ where: { username } });
        return user ? (user.toJSON() as User) : null;
    }
}
