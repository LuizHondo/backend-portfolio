import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import artworkRoutes from './routes/artwork.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/artwork', artworkRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express + TypeScript funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});