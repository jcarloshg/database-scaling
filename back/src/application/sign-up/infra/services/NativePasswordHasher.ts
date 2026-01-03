
import { IPasswordHasher } from '../../models/services/IPasswordHasher';
import { randomBytes, pbkdf2Sync } from 'crypto';

export class NativePasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
        return `${salt}:${hash}`;
    }
}
