import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import progettiRoutes from './routes/progetti';
/* import studentiRoutes from './routes/studenti'; */
import readmeRoutes from './routes/readme';
/* import progettoStudentiRoutes from './routes/progetto_studenti'; */
import { runMigrations } from './migrate'; // aggiunto

const app: Express = express();
const port: number = 3000;

async function start() {
  await runMigrations(); // esegui prima di tutto
  
  const corsOptions = {
  origin: 'https://hof.branchina.edu.it', // Permette solo questo dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi consentiti
  allowedHeaders: ['Content-Type', 'Authorization'], // Header accettati
  optionsSuccessStatus: 200 // Per compatibilità con vecchi browser (es. IE11)
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use('/api/progetti', progettiRoutes);
/*   app.use('/api/studenti', studentiRoutes); */
  app.use('/api/readme', readmeRoutes);
/*   app.use('/api/progetto_studenti', progettoStudentiRoutes); */

  app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
  });
}

start().catch((err) => {
  console.error('Errore avvio server:', err);
  process.exit(1);
});
