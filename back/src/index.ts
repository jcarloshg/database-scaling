
import express from 'express';
import cors from 'cors';
import { syncDatabase } from './application/shared/database';
import { enablePgcryptoExtension } from './application/shared/database/enable-pgcrypto';
import { StaticEnvs } from './application/shared/config/envs';


// Initialize StaticEnvs 
try {
  const staticEnvs: StaticEnvs = StaticEnvs.getInstance();
  console.log('Loaded environment variables:', JSON.stringify(staticEnvs.getEnvs(), null, 2));
} catch (error) {
  console.error('Error loading environment variables:', error);
}

const app = express();
app.use(cors());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const port = StaticEnvs.getInstance().getEnvs().PORT || 3000;
if (require.main === module) {
  (async () => {
    try {
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
