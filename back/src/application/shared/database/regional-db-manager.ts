import { Sequelize } from "sequelize";
import { StaticEnvs } from "../config/envs";
import { DataBaseRegion, REGIONS } from "../variables/db_regions.type";

export class RegionalDbManager {

    private static instance: RegionalDbManager;
    private static dbConnections: Map<DataBaseRegion, Sequelize> = new Map();

    private constructor() {
        REGIONS.map(async (region) => {
            try {
                console.log(`creating connection for: `, region);
                const keys = this.getKeysByRegion(region);
                const sequelize = new Sequelize({
                    database: keys.postgresDbKey,
                    username: keys.postgresUserKey,
                    password: keys.postgresPasswordKey,
                    // host: envs.POSTGRES_URL || 'post_db_us_east',
                    port: Number(keys.postgresPortKey),
                    dialect: "postgres",
                    logging: false,
                });
                RegionalDbManager.dbConnections.set(region, sequelize);
            } catch (error) { }
        });
    }

    public static getInstance(): RegionalDbManager {
        if (!RegionalDbManager.instance) {
            RegionalDbManager.instance = new RegionalDbManager();
        }
        return RegionalDbManager.instance;
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
        const postgresUserKey = staticEnvs.getByKey(
            `POSTGRES_USER_${regionSuffix}`
        );
        const postgresPasswordKey = staticEnvs.getByKey(
            `POSTGRES_PASSWORD_${regionSuffix}`
        );
        const postgresDbKey = staticEnvs.getByKey(`POSTGRES_DB_${regionSuffix}`);
        const postgresPortKey = staticEnvs.getByKey(
            `POSTGRES_PORT_${regionSuffix}`
        );

        return {
            postgresUserKey,
            postgresPasswordKey,
            postgresDbKey,
            postgresPortKey,
        };
    }
}
