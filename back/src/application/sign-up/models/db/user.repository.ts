import { UserModelPostgres } from '../../../shared/database/user.model-postgresql';
import { DataBaseRegion } from '../../../shared/variables/db_regions.type';

// Abstract repository class
export class UserRepository {

    public createUser(data: { username: string; email: string; password_hash: string; }): Promise<UserModelPostgres> {
        throw new Error("Method not implemented.");
    }
    public findByEmail(email: string): Promise<UserModelPostgres | null> {
        throw new Error("Method not implemented.");
    }
    public findByUsername(username: string): Promise<UserModelPostgres | null> {
        throw new Error("Method not implemented.");
    }
}
