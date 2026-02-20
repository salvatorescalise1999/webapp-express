//importimao la connessione del DB
const connection = require('../data/db')


//funzione di index
function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);

    });

}

//funzione di show
function show(req, res) {

    // Prendo l'id dai parametri della richiesta e lo converto in numero
    const id = parseInt(req.params.id);

    // prepariamo la query per la richista
    const movieSql = 'SELECT * FROM movies WHERE id = ?'; 

    connection.query(movieSql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Salviamo il risultato in una costante
        const movie = results[0];

        // ritorniamo il JSON del film
        res.json(movie);
    });

}

module.exports = { index, show }