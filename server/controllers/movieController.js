
const { Op } = require("sequelize");


const db = require("../models");

const { Movies } = db;

const getAllMovies = async (req, res) => {
    const { searchText } = req.query;

    try {
        const conditions = searchText ? {
            where: {
                title: {
                    [Op.iRegexp]: searchText
                }
            }
        } : {};
        const movies = await Movies.findAll(conditions);
        return res.json(movies);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

const getMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movies.findOne({
            where: {
                id: Number(movieId)
            }
        });
        if (!movie) throw new Error("Movie Not Found");
        res.json({
            message: 'Movie Found',
            movie
        });
    }
    catch (e) {
        res.status(404).json({
            message: e.message
        });
    }
}

const addMovie = async (req, res) => {
    const { title, poster, rating } = req.body;

    try {
        const createdMovie = await Movies.create({
            title,
            rating,
            poster
        });
        return res.json({
            message: 'Movie Created Successfully',
            movie: createdMovie
        })
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, poster, rating } = req.body;

    try {
        const updatedMovie = await Movies.update({
            title,
            rating,
            poster
        }, {
            where:
                { id }
        }
        );
        return res.json({
            message: 'Movie Created Successfully',
            movie: updatedMovie
        });
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
};



module.exports = {
    getAllMovies,
    getMovie,
    addMovie,
    updateMovie
}