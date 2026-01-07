import { Post, CreatePostDTO } from './CreatePostInput.model';

export interface PostRepository {
  /**
   * Persists a new post, returns the created entity (which includes timestamp, etc.)
   */
  createPost(data: CreatePostDTO): Promise<Post>;
}
