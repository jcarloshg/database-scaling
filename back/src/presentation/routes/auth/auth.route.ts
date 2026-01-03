import { Express, Router } from "express";
import { SignUpRoute } from "../sign-up.route";

export const AuthRoute = (app: Express) => {

    const router = Router();
    router.post("/sign-up", SignUpRoute);

    router.get("/health", (_req, res) => {
        res.json({ status: 'auth ok?' });
    });

    app.use("/auth", router);

}