import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import routes from './routes/index.js';
import { AppError } from './utils/AppError.js';
import { ZodError } from 'zod';
import type { AnyARecord } from 'dns';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express + TypeScript funcionando!');
});


app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json(err)
  }
  else {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});