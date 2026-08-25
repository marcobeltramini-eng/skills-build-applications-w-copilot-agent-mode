import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.get('/api', (_req, res) => {
  res.json({ message: 'Octofit API is running', baseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API available at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
