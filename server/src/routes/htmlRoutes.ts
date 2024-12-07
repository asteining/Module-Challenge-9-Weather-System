import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// Get the directory name (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define route to serve index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;
