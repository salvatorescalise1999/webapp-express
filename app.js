const express = require('express');
const app = express();
const port = 3000;


// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");

// Rotta home App
// Usiamo "/api" per distinguere le rotte che restituiscono dati (API)
// dalla home "/" che di solito mostra una pagina HTML
app.get('/api', (req, res) => {
    res.send("<h1> Rotta di Home della nostra App di film </h1>")
})

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

// registriamo middelware di gestione err 500
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
