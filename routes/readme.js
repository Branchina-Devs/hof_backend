const express = require('express');
const router = express.Router();
const pool = require('../db');
const marked = require('marked');
const fetch = require('node-fetch')

console.log("connessione ai readme")

router.get('/', async (req, res) => {
    pool.query('SELECT id_p, readme_link FROM progetti', async (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        queryReadme(err, res, results)
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    pool.query('select readme_link from progetti where id_p = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore nel database' });
        }
        queryReadme(err, res, results)
    })
})

async function queryReadme(req, res, results){
        try {
            const parsed = await Promise.all(
                results.map(async (row) => {
                    const response = await fetch(row.readme_link);
                    const markdown = await response.text();
                    const html = marked.parse(markdown);

                    const sections = splitMarkdownSections(markdown);

                    return {
                        id: row.id_p,
                        sections
                    };
                })
            );

            res.json(parsed);

        } catch (e) {
            res.status(500).json({ error: 'Errore parsing README' });
        }
    
}

function splitMarkdownSections(markdown) {
    const tokens = marked.lexer(markdown);
    const sections = [];
    let current = null;

    for (const t of tokens) {
        if (t.type === 'heading') {
            current = { title: t.text, level: t.depth, content: '' };
            sections.push(current);
        } else if (current) {
            current.content += t.raw || '';
        }
    }
    return sections;
}

module.exports = router;