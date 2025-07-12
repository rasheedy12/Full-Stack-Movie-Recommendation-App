const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{
        type: Number,
    }],
    watchlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchlist',
    }],
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);