import { Express, Router } from "express";
import { SignUpRoute } from "../sign-up.route";

export const AuthRoute = (app: Express) => {

    const router = Router();
    router.post("/sign-up", SignUpRoute);

    app.use("/auth", router);

}