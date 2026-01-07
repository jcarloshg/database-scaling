import { Post } from '../../models/CreatePostInput.model';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { RegionalDbManager } from '../../../shared/database/regional-db-manager';

// Define a Sequelize Model for posts_with_user (for direct usage)
class PostModel extends Model<Post, Omit<Post, 'id' | 'created_at'>> implements Post {
  public id!: string;
  public content!: string;
  public created_at!: Date;
  public user_uuid!: string;
  public user_name!: string;
}

let isInitialized = false;

export const getPostModel = (): typeof PostModel => {
  if (!isInitialized) {
    const sequelize = RegionalDbManager.getCurrentConnection().connection!;
    PostModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
            isNotBlank(value: string) {
              if (typeof value === 'string' && value.trim() === '') {
                throw new Error('Content cannot be empty or blank');
              }
            }
          }
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        user_uuid: {
          type: DataTypes.UUID,
          allowNull: false
        },
        user_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize,
        tableName: 'posts_with_user',
        timestamps: false,
      }
    );
    isInitialized = true;
  }
  return PostModel;
};

