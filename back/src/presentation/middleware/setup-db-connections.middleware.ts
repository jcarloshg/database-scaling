// setup-db-connections

import { Request, Response } from "express";
import { RegionalDbManager } from "../../application/shared/database/regional-db-manager";
import { DataBaseRegion, REGIONS } from "../../application/shared/variables/db_regions.type";
import { UserModelPostgres } from "../../application/shared/database/user.model-postgresql";

export const SetUpDbConnections = async (
    req: Request,
    _res: Response,
    next: Function
) => {

    // ─────────────────────────────────────
    // check the request region && set DB connection
    // ─────────────────────────────────────
    let region: DataBaseRegion | undefined = req.headers["x-region"]
        ? Array.isArray(req.headers["x-region"])
            ? req.headers["x-region"][0] as DataBaseRegion
            : req.headers["x-region"] as DataBaseRegion
        : undefined;
    // get a random region if not provided
    if (!region) {
        region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    }
    console.log(`[SetUpDbConnections Middleware] Request from region: ${region}`);
    // set the database connection based on region
    RegionalDbManager.setConnectionByRegion(region);

    // set the correct sequelize instance based on the current region
    const currentConnection = RegionalDbManager.getCurrentConnection();
    UserModelPostgres.setConnection(currentConnection.connection!);

    const a = await UserModelPostgres.findAll()
    console.log(`Users found in ${region} DB: `, a.length);

    next();
};
