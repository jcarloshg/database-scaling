import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from './connection';


interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;

  public static setConnection(sequelizeInstance: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            len: [3, 50],
          },
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password_hash: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        tableName: 'users',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['username'],
          },
        ],
      }
    );
  }
}


// User.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     username: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//       unique: true,
//       validate: {
//         len: [3, 50],
//       },
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password_hash: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'users',
//     timestamps: false,
//     indexes: [
//       {
//         unique: true,
//         fields: ['username'],
//       },
//     ],
//   }
// );
