import sequelize from './connection';
import './user.model';
import './post.model';

export const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

export default sequelize;
