import express from 'express';
import cors from 'cors';
import { syncDatabase } from './application/shared/database';
import { enablePgcryptoExtension } from './application/shared/database/enable-pgcrypto';
import { StaticEnvs } from './application/shared/config/envs';
import { AuthRoute } from './presentation/routes/auth/auth.route';
import { RegionalDbManager } from './application/shared/database/regional-db-manager';


// Initialize StaticEnvs 
StaticEnvs.getInstance();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

AuthRoute(app);

const port = StaticEnvs.getInstance().getEnvs().PORT || 3000;
if (require.main === module) {
  (async () => {
    try {
      await RegionalDbManager.getInstance();
      await enablePgcryptoExtension();
      await syncDatabase();
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  })();
}

export default app;
