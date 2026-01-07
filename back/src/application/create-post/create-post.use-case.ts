import { PostRepository } from "./models/post.repository";
import {
  CreatePostRequestSchema,
  CreatePostDTO,
  Post,
} from "./models/CreatePostInput.model";

export interface CreatePostResponse {
  code: number;
  message: string;
  data: Post | null;
  error?: any;
}

export class CreatePostUseCase {

  constructor(private readonly postRepository: PostRepository) { }

  public async execute(request: CreatePostDTO): Promise<CreatePostResponse> {
    // Validate input (only 'content'; user_uuid/name assumed trusted)
    const validation = CreatePostRequestSchema.safeParse({ content: request.content });
    if (!validation.success) {
      return {
        code: 400,
        message: "Invalid request.",
        data: null,
        error: validation.error.format(),
      };
    }

    try {
      const post = await this.postRepository.createPost(request);
      return {
        code: 201,
        message: "Post created successfully.",
        data: post,
      };
    } catch (err: any) {
      return {
        code: 500,
        message: "Could not create post.",
        data: null,
        error: err?.message || err,
      };
    }
  }
}
