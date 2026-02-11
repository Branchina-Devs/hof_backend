const express = require('express');
const router = express.Router();
const pool = require('../db');
console.log('Router progetti caricato');

//route per ottenere tutti i progetti all'interno del db
router.get('/', (req, res) => {
    pool.query('select * from progetti', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore nel database' });
        }
        res.json(results)
    })
})





//route per ottenere un progetto specifico tramite id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    pool.query('select * from progetti where id_p = ?', [id], (err, results) => {
        if (err){
            console.log(err);
        } else if (results.length === 0){
            console.log(`Progetto con id ${id} non trovato`);
        }
        res.json(results[0]);
    })
})




module.exports = router;