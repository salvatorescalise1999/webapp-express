// importiamo parte di express
const express = require("express");

// importiamo parte di express per gestire le rotte
const router = express.Router();

// importiamo il relativo controller
const movieController = require('../controllers/movieController');

// definiamo le rotte

// rotta di INDEX → GET api/movie
router.get("/", movieController.index);

// rotta di SHOW → GET api/movie/:id
router.get("/:id", movieController.show);

// rotta di CREATE(recensione) → POST api/movie/:id/reviews
router.post('/:id/reviews', movieController.storeReview);


module.exports = router;