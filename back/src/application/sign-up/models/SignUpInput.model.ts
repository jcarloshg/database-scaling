import { z } from 'zod';

export const SignUpRequestSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
});

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export type RegisteredUserToReturn = Omit<SignUpRequest, 'password'> & { created_at: Date; id: string };
