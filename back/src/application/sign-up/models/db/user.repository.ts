import { User } from '../../../shared/database/user.model';
import { DataBaseRegion } from '../../../shared/variables/db_regions.type';

// Abstract repository class
export class UserRepository {


    constructor(public dbRegion: DataBaseRegion = "US_EAST") { }

    public createUser(data: { username: string; email: string; password_hash: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    public findByUsername(username: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}
