const {createPool} = require('mysql2');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rocco307002__-__',
    database: 'progetti_scolastici',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const connection = pool.getConnection((err) => {
    if(err) {
        console.log(`Errore di connessione al database: ${err}`);
    } else {
        console.log(`Connessione al database riuscita`)
    }
})

module.exports = pool;