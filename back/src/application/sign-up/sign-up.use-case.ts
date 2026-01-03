import { IUserRepository } from './models/db/user.repository';
import { IPasswordHasher } from './models/services/IPasswordHasher';
import { SignUpRequest, SignUpRequestSchema } from './models/SignUpInput.model';

export interface SignUpResponse {
    code: number;
    message: string;
    data: {
        id: string;
        username: string;
        email: string;
        created_at: Date;
    } | null;
}

export class SignUpUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async execute(request: SignUpRequest): Promise<SignUpResponse> {
        // Validate input
        const parsed = SignUpRequestSchema.safeParse(request);
        if (!parsed.success) {
            return {
                code: 400,
                message: 'Invalid sign up data',
                data: null,
            };
        }

        // Check for existing user
        const existingEmail = await this.userRepository.findByEmail(request.email);
        if (existingEmail) {
            return {
                code: 409,
                message: 'Email already in use',
                data: null,
            };
        }
        const existingUsername = await this.userRepository.findByUsername(request.username);
        if (existingUsername) {
            return {
                code: 409,
                message: 'Username already in use',
                data: null,
            };
        }

        // Hash password
        const password_hash = await this.passwordHasher.hash(request.password);

        // Create user
        const user = await this.userRepository.createUser({
            username: request.username,
            email: request.email,
            password_hash,
        });

        return {
            code: 201,
            message: 'User created successfully',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
            },
        };
    }
}