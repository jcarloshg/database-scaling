import { Request, Response } from "express";

import { SignUpUseCase } from "../../../application/sign-up/sign-up.use-case"
import { UserRepositoryPostgresql } from "../../../application/sign-up/infra/postgresql/user-repository.postgresql";
import { NativePasswordHasher } from "../../../application/sign-up/infra/services/NativePasswordHasher";

export const SignUpController = async (req: Request, res: Response) => {

    const userRepository = new UserRepositoryPostgresql();
    const passwordHasher = new NativePasswordHasher();
    const signUpUseCase = new SignUpUseCase(userRepository, passwordHasher);
    const result = await signUpUseCase.execute(req.body);

    res.status(result.code).json({
        message: result.message,
        data: result.data,
    });
}
