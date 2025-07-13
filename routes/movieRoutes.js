const express = require('express');
const axios = require('axios');
const movieRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Search movies by title
movieRouter.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query }
        });
        res.json(response.data.results); // Return only the results array
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Discover movies with filters
movieRouter.get('/discover', async (req, res) => {
    try {
        const { genre, year } = req.query;
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                with_genres: genre,
                primary_release_year: year
            }
        });
        res.json(response.data.results); // Return only the results array
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get detailed info for a single movie
movieRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = movieRouter;