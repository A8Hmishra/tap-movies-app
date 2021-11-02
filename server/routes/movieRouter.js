const express = require("express");
const { getAllMovies, getMovie, addMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:movieId", getMovie);
router.post("/", addMovie);

module.exports = router;