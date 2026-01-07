// user-repository.postgresql
import { UserModelPostgres } from "../../../shared/database/user.model-postgresql";
import { UserRepository } from "../../models/db/user.repository";

export class UserRepositoryPostgresql implements UserRepository {

    async createUser(data: {
        username: string;
        email: string;
        password_hash: string;
    }): Promise<UserModelPostgres> {
        // const UserSchema = User.setRegionSequelize(this.dbConnection);
        const user = await UserModelPostgres.create({
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
        });
        return user.toJSON() as UserModelPostgres;
    }

    async findByEmail(email: string): Promise<UserModelPostgres | null> {
        const user = await UserModelPostgres.findOne({ where: { email } });
        return user ? (user.toJSON() as UserModelPostgres) : null;
    }

    async findByUsername(username: string): Promise<UserModelPostgres | null> {
        const user = await UserModelPostgres.findOne({ where: { username } });
        return user ? (user.toJSON() as UserModelPostgres) : null;
    }
}
