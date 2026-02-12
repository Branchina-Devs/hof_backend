import express, { Router, Request, Response } from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

const router: Router = express.Router();
console.log('Router studenti caricato');

interface Studente extends RowDataPacket {
    id_s: number;
}

router.get('/', (req: Request, res: Response): void => {
    pool.query('SELECT * FROM studenti', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Errore nel database' });
            return;
        }
        res.json(results);
    });
});

router.get('/:id', (req: Request, res: Response): void => {
    const id = req.params.id as string;
    
    pool.query<Studente[]>(
        'SELECT * FROM studenti WHERE id_s = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Errore nel database' });
                return;
            }
            
            if (results.length === 0) {
                console.log(`Studente con id ${id} non trovato`);
                res.status(404).json({ error: 'Studente non trovato' });
                return;
            }
            
            res.json(results[0]);
        }
    );
});

export default router;