const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/progetti', (req, res) => {
    pool.query('select * from progetti', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore nel database' });
        }
        res.json(results)
    })
})

module.exports =