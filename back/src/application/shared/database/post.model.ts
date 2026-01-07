// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from './connection';
// import { User } from './user.model';
// 
// interface PostAttributes {
//   id: string;
//   user_id: string;
//   content: string;
//   created_at?: Date;
// }
// 
// interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'created_at'> {}
// 
// export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
//   public id!: string;
//   public user_id!: string;
//   public content!: string;
//   public created_at!: Date;
// }
// 
// Post.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: 'id',
//       },
//       onDelete: 'CASCADE',
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//         notNull: true,
//         isNotBlank(value: string) {
//           if (typeof value === 'string' && value.trim() === '') {
//             throw new Error('Content cannot be empty or blank');
//           }
//         },
//       },
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'posts',
//     timestamps: false,
//     indexes: [
//       {
//         fields: ['user_id'],
//         name: 'idx_posts_user_id',
//       },
//       {
//         fields: [{ name: 'created_at', order: 'DESC' }],
//         name: 'idx_posts_created_at',
//       },
//     ],
//   }
// );
// 
// // Associations should be set after all models are defined and imported in a central place (e.g., database/index.ts)
// // Keeping here for reference, but best practice is to move to database/index.ts:
// // Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// // User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });
