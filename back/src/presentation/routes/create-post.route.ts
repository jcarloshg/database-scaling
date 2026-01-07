import { Express, Router } from "express";
import { CreatePostController } from "../controller/create-post.controller";
import { CreatePostMiddleware } from "../middleware/create-post.middleware";

export const PostRoute = (app: Express) => {
  const router = Router();

  // POST /posts - create a new post
  router.post("/", CreatePostMiddleware, CreatePostController);

  app.use("/posts", router);
};
