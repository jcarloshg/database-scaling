// user-repository.postgresql
import { Sequelize } from "sequelize";
import { RegionalDbManager } from "../../../shared/database/regional-db-manager";
import { User } from "../../../shared/database/user.model-postgresql";
import { DataBaseRegion } from "../../../shared/variables/db_regions.type";
import { UserRepository } from "../../models/db/user.repository";

export class UserRepositoryPostgresql implements UserRepository {

    private dbConnection: Sequelize;

    constructor(public dbRegion: DataBaseRegion = "US_EAST") {
        const dbConnection = RegionalDbManager.getDbConnectionByRegion(dbRegion);
        if (!dbConnection) throw new Error(`No DB connection found for region: ${dbRegion}`);
        this.dbConnection = dbConnection;
    }

    async createUser(data: {
        username: string;
        email: string;
        password_hash: string;
    }): Promise<User> {
        // const UserSchema = User.setRegionSequelize(this.dbConnection);
        const user = await User.create({
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
        });
        return user.toJSON() as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        return null;
        // const user = await User.findOne({ where: { email } });
        // return user ? (user.toJSON() as User) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        return null;
        // const user = await User.findOne({ where: { username } });
        // return user ? (user.toJSON() as User) : null;
    }
}
