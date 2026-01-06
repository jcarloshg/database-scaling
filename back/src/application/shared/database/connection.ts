import { StaticEnvs } from '../config/envs';
import { Sequelize } from 'sequelize';

const staticEnvs = StaticEnvs.getInstance();
const envs = staticEnvs.getEnvs();

// Database connection configuration using StaticEnvs
const sequelize = new Sequelize({
  database: envs.POSTGRES_DB || 'post_db',
  username: envs.POSTGRES_USER || 'admin',
  password: envs.POSTGRES_PASSWORD || '123456',
  host: envs.POSTGRES_URL || 'post_db_us_east',
  port: Number(envs.POSTGRES_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;


