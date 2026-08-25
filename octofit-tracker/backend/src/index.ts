import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker backend running at ${baseUrl}`);
});
