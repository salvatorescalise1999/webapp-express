const express = require('express');
const app = express();
const port = 3000;


// Rotta home
app.get('/', (req, res) => {
    res.send("<h1>Home blog</h1>")
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
