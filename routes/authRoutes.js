const express = require('express');
const authRouter = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', authMiddleware, getCurrentUser);

module.exports = authRouter;
