const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
const userRouter = express.Router();

// Add a movie to favorites
userRouter.post('/favorites', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.favorites.includes(req.body.movieId)) {
            user.favorites.push(req.body.movieId);
            await user.save();
        }
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a movie from favorites
userRouter.delete('/favorites/:movieId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter(id => id !== Number(req.params.movieId));
        await user.save();
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new watchlist
userRouter.post('/watchlists', authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const watchlist = new Watchlist({
            name,
            description,
            movies: [],
            owner: req.user.id
        });
        await watchlist.save();

        // Add to user's watchlists
        const user = await User.findById(req.user.id);
        user.watchlists.push(watchlist._id);
        await user.save();

        res.status(201).json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add/remove movies from a specific watchlist
userRouter.put('/watchlists/:id', authMiddleware, async (req, res) => {
    try {
        const { movieId, action } = req.body; // action: 'add' or 'remove'
        const watchlist = await Watchlist.findById(req.params.id);

        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        if (String(watchlist.owner) !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        if (action === 'add' && !watchlist.movies.includes(movieId)) {
            watchlist.movies.push(movieId);
        } else if (action === 'remove') {
            watchlist.movies = watchlist.movies.filter(id => id !== movieId);
        }
        await watchlist.save();
        res.json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = userRouter;