// import { REGIONS } from '../variables/db_regions.type';
// import sequelize from './connection';
// import { RegionalDbManager } from './regional-db-manager';
// 
// export async function enablePgcryptoExtension() {
//   // await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
//   await Promise.all(
//     REGIONS.map(async (region) => {
//       const regionalSequelize = RegionalDbManager.getDbConnectionByRegion(region);
//       if (!regionalSequelize) return
//       await regionalSequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
//     })
//   );
// }
