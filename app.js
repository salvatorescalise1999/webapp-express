const express = require('express');
const app = express();
const port = process.env.PORT;

// Importiamo il middleware Cors
const cors = require("cors");

// Middleware per il CORS
app.use(cors({
    origin:'http://localhost:5173/'
}));

//import del router dei film
const movieRouter = require('./routers/movieRouter')

// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");

// Attivo cartella public per uso file statici
app.use(express.static('public'));

// Registro il body-parser per "application/json"
app.use(express.json());

// Rotta home App
// Usiamo "/api" per distinguere le rotte che restituiscono dati (API) dalla home "/" che di solito mostra una pagina HTML
app.get('/api', (req, res) => {
    res.send("<h1> Rotta di Home della nostra App di film </h1>")
})

// Rotte relative al router dei film
app.use('/api/movies', movieRouter) ;

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

// registriamo middelware di gestione err 500
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
