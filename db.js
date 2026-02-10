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

module.exports = pool;

// pool.query('SELECT * FROM progetti', (err, res, fields) => {
//     if (err) throw err;
//     console.log(res);
/