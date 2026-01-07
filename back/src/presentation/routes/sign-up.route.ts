import { Request, Response } from "express";

import { SignUpUseCase } from "../../application/sign-up/sign-up.use-case"
import { UserRepositoryPostgresql } from "../../application/sign-up/infra/postgresql/user-repository.postgresql";
import { NativePasswordHasher } from "../../application/sign-up/infra/services/NativePasswordHasher";

import { Router } from "express";

export const SignUpRoute = async (req: Request, res: Response) => {
    const userRepository = new UserRepositoryPostgresql();
    const passwordHasher = new NativePasswordHasher();
    const signUpUseCase = new SignUpUseCase(userRepository, passwordHasher);
    const result = await signUpUseCase.execute(req.body);

    res.status(result.code).json({
        message: result.message,
        data: result.data,
    });
}

// Example middleware for /sign-up
const signUpMiddleware = (req: Request, res: Response, next: Function) => {
    // For demonstration: log the request method and url
    console.log(`[SignUp Middleware] ${req.method} ${req.url}`);
    // You could add validation, IP whitelisting, etc. here
    next();
};

// Router for /sign-up
export const SignUpRouter = Router();
SignUpRouter.post("/sign-up", signUpMiddleware, SignUpRoute);
