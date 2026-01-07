import { Sequelize } from "sequelize";
import { StaticEnvs } from "../config/envs";
import { DataBaseRegion, REGIONS } from "../variables/db_regions.type";

export class RegionalDbManager {

    private static _instance: RegionalDbManager;
    private static _dbConnections: Map<DataBaseRegion, Sequelize> = new Map();

    private static _currentRegion: DataBaseRegion | null = null;
    private static _currentConnection: Sequelize | null = null;

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
                    RegionalDbManager._dbConnections.set(region, sequelize);
                } catch (error) {
                    console.error(`Error creating DB connection for region ${region}:`, error);
                }
            }
        );
    }

    public static getInstance(): RegionalDbManager {
        if (!RegionalDbManager._instance) {
            RegionalDbManager._instance = new RegionalDbManager();
        }
        return RegionalDbManager._instance;
    }


    static setConnectionByRegion(region: DataBaseRegion) {
        const dbConnection = RegionalDbManager._dbConnections.get(region);
        if (dbConnection) {
            RegionalDbManager._currentRegion = region;
            RegionalDbManager._currentConnection = dbConnection;
            console.log(`Set DB connection to region: ${region}`);
        } else {
            console.error(`No DB connection found for region: ${region}`);
        }
    }

    static getCurrentConnection() {
        return {
            region: RegionalDbManager._currentRegion,
            connection: RegionalDbManager._currentConnection,
        }
    }

    public static checkConnection = async (region: DataBaseRegion) => {
        const dbConnection = RegionalDbManager._dbConnections.get(region);
        if (dbConnection) {
            try {

                // back             |   database: 'post_db',
                // back             |   username: 'admin',
                // back             |   password: '123456',
                // back             |   host: 'post_db_asia',
                // back             |   port: 5104,

                // const sequelize = new Sequelize({
                //     database: 'post_db',
                //     username: 'admin',
                //     password: '123456',
                //     host: 'post_db_asia',
                //     port: 5104,
                //     dialect: "postgres",
                //     logging: false,
                // });
                // // await sequelize.authenticate();
                // await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

                const conf = dbConnection.config;
                console.log(`\nconf: `, conf);
                await dbConnection.authenticate();
                await dbConnection.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

                console.log(`Connection to ${region} has been established successfully.`);
            } catch (error) {
                console.error(`Error to connect to the database for region ${region}:`, error);
            }
        }
    }

    public static checkConnections = async () => {
        await Promise.all(
            REGIONS.map(async (reg) => {
                const dbConnection = RegionalDbManager._dbConnections.get(reg);
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
        return RegionalDbManager._dbConnections.get(region);
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
