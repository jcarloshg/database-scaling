import { CreatePostDTO, Post } from '../../models/CreatePostInput.model';
import { PostRepository } from '../../models/post.repository';
import { getPostModel } from './post.repository.postgresql';


export class PostRepositoryPostgresql implements PostRepository {
  async createPost(dto: CreatePostDTO): Promise<Post> {
    const PostModel = getPostModel();
    const entity = await PostModel.create({
      content: dto.content,
      user_uuid: dto.user_uuid,
      user_name: dto.user_name,
    });
    // Sequelize returns instance; reduce to DTO
    return {
      id: entity.id,
      content: entity.content,
      created_at: entity.created_at,
      user_uuid: entity.user_uuid,
      user_name: entity.user_name,
    };
  }
}
