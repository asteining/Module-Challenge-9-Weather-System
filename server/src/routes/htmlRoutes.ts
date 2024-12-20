import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, type Request, type Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.get('*', (_req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, '../../../client/dist/index.html');
  res.sendFile(filePath);
});

export default router;
