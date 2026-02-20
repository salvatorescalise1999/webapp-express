// importiamo parte di express
const express = require("express");

// importiamo parte di express per gestire le rotte
const router = express.Router();

// importiamo il relativo controller
const movieController = require('../controllers/movieController');

// definiamo le rotte

// rotta di INDEX → GET /movie
router.get("/", movieController.index);

// rotta di SHOW → GET /movie/:id
router.get("/:id", movieController.show);


module.exports = router;