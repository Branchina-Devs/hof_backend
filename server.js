const express = require('express');
const app = express();



const progettiRoutes = require('./routes/progetti');
// const router = require('./routes/progetti')
// const db = require('./db');
const port = 3000;



app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/public'});
})

app.use('/api', progettiRoutes)