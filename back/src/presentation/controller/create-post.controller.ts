import { Request, Response } from "express";
import { CreatePostUseCase } from "../../application/create-post/create-post.use-case";
import { CreatePostDTO } from "../../application/create-post/models/CreatePostInput.model";
import { PostRepositoryPostgresql } from '../../application/create-post/infra/postgresql/PostRepositoryPostgresql';

export const CreatePostController = async (req: Request, res: Response) => {
  const postRepository = (req as any).postRepository as PostRepositoryPostgresql;
  const user_uuid = (req as any).user_uuid;
  const user_name = (req as any).user_name;

  const useCase = new CreatePostUseCase(postRepository);
  const dto: CreatePostDTO = {
    content: req.body.content,
    user_uuid: user_uuid as string,
    user_name: user_name as string,
  };

  const result = await useCase.execute(dto);
  res.status(result.code).json({
    message: result.message,
    data: result.data,
    error: result.error,
  });
};
