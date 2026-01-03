// Hashing service interface

export interface IPasswordHasher {
    hash(password: string): Promise<string>;
}
