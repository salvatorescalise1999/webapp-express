//importimao la connessione del DB
const connection = require('../data/db')


//funzione di index
function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        
        // creo una copia dei risultati con modifica path imgs
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);

    });

}

//funzione di show
function show(req, res) {

    // Prendo l'id dai parametri della richiesta e lo converto in numero
    const id = parseInt(req.params.id);

    // prepariamo la query per la richista del film
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // prepariamo la query per la richista della reviews
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // chiamamta a id principale per recuperare il libro
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Salviamo il risultato in una costante
        const movie = movieResults[0];

        // aggiungo path img dal middleware
        movie.image = req.imagePath + movie.image;

        // chiammata  id secondaria per recupero reviews del film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // salvaiamo le reviews in una costante
            const reviewsArray = reviewsResults;

            // Aggiungiamo all'oggetto film la proprietà per le reviews
            movie.reviews = reviewsArray;

            // ritorniamo il JSON del film
            res.json(movie);
        });

    });
}

module.exports = { index, show }