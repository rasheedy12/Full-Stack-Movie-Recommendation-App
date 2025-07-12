const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    movies: [{ type: Number }], // TMDB movie IDs
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Watchlist', watchlistSchema);