// import sequelize from './connection';
// import './user.model';
// import './post.model';
// import { REGIONS } from '../variables/db_regions.type';
// import { RegionalDbManager } from './regional-db-manager';
// 
// export const syncDatabase = async () => {
//   // await sequelize.sync({ alter: true });
//   await Promise.all(
//     REGIONS.map(async (region) => {
//       const regionalSequelize = RegionalDbManager.getDbConnectionByRegion(region);
//       if (!regionalSequelize) return
//       await regionalSequelize.sync({ alter: true });
//     })
//   );
// };
// 
// export default sequelize;
