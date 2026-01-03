import sequelize from './connection';

export async function enablePgcryptoExtension() {
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
}
