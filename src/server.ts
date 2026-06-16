import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import routes from './routes/index.js';
import { AppError } from './utils/AppError.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express + TypeScript funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

app.use((err: AppError, req: Request, res: Response) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  }
  else {
    res.status(500).json({ error: 'Internal server error' });
  }
}
);