const express = require("express");
const { getAllMovies, getMovie, addMovie, updateMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:movieId", getMovie);
router.post("/", addMovie);
router.patch("/update/:id", updateMovie);

module.exports = router;