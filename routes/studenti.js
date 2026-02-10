const express = require('express');
const router = express.Router();
const pool = require('../db');
console.log('Router studenti caricato');

//router per ottenere tutti gli studenti all'interno del db
router.get('/', (req, res) => {
    pool.query('select * from studenti', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore nel database' });
        }
        res.json(results)
    })
})

//router per ottenere uno specifico studente tramite id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    pool.query('select * from studenti where id_s = ?', [id], (err, results) => {
        if (err){
            console.log(err);
        } else if (results.length === 0){
            console.log(`Studente con id ${id} non trovato`);
        }
        res.json(results[0]);
    })
})

module.exports = router;