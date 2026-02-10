const express = require('express');
const app = express();
const progettiRoutes = require('./routes/progetti');
const studentiRoutes = require ('./routes/studenti');
const progettoStudentiRoutes = require('./routes/progetto_studenti')
const port = 3000;

app.use(express.static('public'));

//route per la home page, alla root del sito invio il file index.html che si trova nella cartella public
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/public'});
})

//router per gestire tutte le richieste che iniziano con /api/'x' saranno gestite da xRoutes
app.use('/api/progetti', progettiRoutes);
app.use('/api/studenti', studentiRoutes);
app.use('/api/progetto_studenti', progettoStudentiRoutes)

//avvio del server sulla porta 3000
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
})
