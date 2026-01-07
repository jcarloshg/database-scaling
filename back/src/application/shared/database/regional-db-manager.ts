import { Sequelize } from "sequelize";
import { StaticEnvs } from "../config/envs";
import { DataBaseRegion, REGIONS } from "../variables/db_regions.type";

export class RegionalDbManager {

    private static instance: RegionalDbManager;
    private static dbConnections: Map<DataBaseRegion, Sequelize> = new Map();

    private constructor() {
        REGIONS.map(
            (region) => {
                try {
                    console.log(`creating connection for: `, region);
                    const keys = this.getKeysByRegion(region);
                    const sequelize = new Sequelize({
                        database: keys.postgresDbKey,
                        username: keys.postgresUserKey,
                        password: keys.postgresPasswordKey,
                        host: keys.postgresHostKey,
                        port: Number(keys.postgresPortKey),
                        dialect: "postgres",
                        logging: false,
                    });
                    RegionalDbManager.dbConnections.set(region, sequelize);
                } catch (error) {
                    console.error(`Error creating DB connection for region ${region}:`, error);
                }
            }
        );
    }

    public static getInstance(): RegionalDbManager {
        if (!RegionalDbManager.instance) {
            RegionalDbManager.instance = new RegionalDbManager();
        }
        return RegionalDbManager.instance;
    }

    public static checkConnections = async () => {
        await Promise.all(
            REGIONS.map(async (reg) => {
                const dbConnection = RegionalDbManager.dbConnections.get(reg);
                if (dbConnection) {
                    try {
                        // await conn.authenticate();
                        const conf = dbConnection.config;
                        console.log(`Testing connection to ${reg} at ${conf.host}:${conf.port}/${conf.database} as ${conf.username}`);
                        await dbConnection.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
                        console.log(`Connection to ${reg} has been established successfully.`);
                    } catch (error) {
                        console.error(`Error to connect to the database for region ${reg}:`, error);
                    }
                }
            })
        )
    }

    // ─────────────────────────────────────
    // aux methods
    // ─────────────────────────────────────

    static getDbConnectionByRegion(region: DataBaseRegion): Sequelize | undefined {
        return RegionalDbManager.dbConnections.get(region);
    }

    private getKeysByRegion(region: DataBaseRegion): {
        postgresUserKey: string | undefined;
        postgresPasswordKey: string | undefined;
        postgresDbKey: string | undefined;
        postgresPortKey: string | undefined;
        postgresHostKey: string | undefined;
    } {
        const getRegion = (region: DataBaseRegion): string => {
            switch (region) {
                case "US_EAST":
                    return "east";
                case "US_WEST":
                    return "west";
                case "EUROPE":
                    return "europe";
                case "ASIA":
                    return "asia";
            }
        };

        const regionSuffix = getRegion(region);
        const staticEnvs = StaticEnvs.getInstance();
        const postgresUserKey = staticEnvs.getByKey(`POSTGRES_USER_${regionSuffix}`);
        const postgresPasswordKey = staticEnvs.getByKey(`POSTGRES_PASSWORD_${regionSuffix}`);
        const postgresDbKey = staticEnvs.getByKey(`POSTGRES_DB_${regionSuffix}`);
        const postgresPortKey = staticEnvs.getByKey(`POSTGRES_PORT_${regionSuffix}`);
        const postgresHostKey = staticEnvs.getByKey(`POSTGRES_HOST_${regionSuffix}`);

        return {
            postgresUserKey,
            postgresPasswordKey,
            postgresDbKey,
            postgresPortKey,
            postgresHostKey,
        };
    }
}
