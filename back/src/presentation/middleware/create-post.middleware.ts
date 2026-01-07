import { Request, Response, NextFunction } from "express";
import { RegionalDbManager } from "../../application/shared/database/regional-db-manager";
import { DataBaseRegion, REGIONS } from "../../application/shared/variables/db_regions.type";
import { PostRepositoryPostgresql } from '../../application/create-post/infra/postgresql/PostRepositoryPostgresql';

export const CreatePostMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  // Step 1: Setup region-aware DB
  let region: DataBaseRegion | undefined = req.headers["x-region"]
    ? Array.isArray(req.headers["x-region"])
      ? req.headers["x-region"][0] as DataBaseRegion
      : req.headers["x-region"] as DataBaseRegion
    : undefined;
  if (!region) {
    region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  }
  RegionalDbManager.setConnectionByRegion(region);

  // Step 2: Register repository
  (req as any).postRepository = new PostRepositoryPostgresql();

  // Step 3: Inject user context (MOCK for now; in real system, derive from auth middleware/session)
  // In production, this should come from a previous auth middleware.
  (req as any).user_uuid = req.headers["x-user-uuid"] ?? "mock-user-uuid";
  (req as any).user_name = req.headers["x-user-name"] ?? "mockuser";

  next();
};
