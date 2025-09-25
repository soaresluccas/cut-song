import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './web.routes';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(router);

export { app };

