import { Express, Router } from "express";
import { SignUpController } from "../../controller/auth/sign-up.controller";
import { SetUpDbConnections } from "../../middleware/setup-db-connections.middleware";

export const AuthRoute = (app: Express) => {

    const router = Router();
    router.post("/sign-up", SetUpDbConnections, SignUpController);

    router.get("/health", (_req, res) => {
        res.json({ status: 'auth ok?' });
    });

    app.use("/auth", router);

}