const db = require('../db');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_SECRET || 'superSecretKey';
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'superRefreshKey';
const NotFoundError = require('../errors/NotFoundError');
const AuthenticationError = require('../errors/AuthintacationError');

const USERS_QUERY = 'SELECT * FROM users';
const queryText = `INSERT INTO users(name, role ) VALUES($1, $2) RETURNING *`;
const queryTextForRegister = `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`;
const checkEmailQuery = `SELECT * FROM users WHERE email = $1`;
const refreshTokenQuery = `INSERT INTO refresh_tokens(user_id, token, expires_at) VALUES($1, $2, $3) RETURNING *`;
const bcrypt = require('bcrypt');


async function saveRefreshToken(userId, token, expiresAt) {
    const result = await db.query(refreshTokenQuery, [userId, token, expiresAt]);
    return result.rows[0];
}

async function deleteRefreshToken(token) {
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
}

async function refreshAccessToken(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        const userId = decoded.id;

        const storedToken = await findRefreshToken(userId, refreshToken); // Check if the refresh token exists in the database

        if (!storedToken) {
            throw new Error('Invalid refresh token');
        }

        const user = await findUserById(userId);

        // Generate a new access token
        const newAccessToken = jwt.sign({ id: userId, email: user.email, role: user.role }, accessTokenSecret, { expiresIn: '1h' });
        return newAccessToken;
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
}

async function findUserById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}


async function findRefreshToken(userID, refreshToken) {
     // Check if the refresh token exists in the database
        const result = await db.query('SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2', [userID, refreshToken]);
        if (result.rows.length === 0) {
            throw new Error('Invalid refresh token');
        }
}



async function getAllUsers() {
    const result = await db.query(USERS_QUERY);
    return result.rows;
}

async function createUser(userdata) {
     const queryValues = [userdata.name,userdata.role];
    const result = await db.query(queryText, queryValues);
    return result.rows[0];
}

async function findUserByEmail(email) {
    const result = await db.query(checkEmailQuery, [email]);
    return result.rows[0];
}

async function loginUser(userData) {
    const { email, password } = userData;
   const user = await findUserByEmail(email);

   if (!user) {
        throw new NotFoundError('User not found');
    }
   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AuthenticationError('Invalid credentials');
        }

        const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role}, accessTokenSecret, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id}, refreshTokenSecret, { expiresIn: '30d' });
        await saveRefreshToken(user.id, refreshToken, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // Save refresh token with expiration date

        delete user.password; // Remove the password field from the returned user object
        return {accessToken, refreshToken, user };
   
}

async function checkEmailExists(email) {
    const result = await db.query(checkEmailQuery, [email]);
    return result.rows.length > 0;
}

async function registerUser(userdata) {

    const {
    name,
    email,
    password,
    role
} = userdata;

    const emailExists = await checkEmailExists(email);

    if(emailExists){
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const queryValues = [name, email, hashedPassword, role];
    const result = await db.query(queryTextForRegister, queryValues);
    const createdUser = result.rows[0];
    delete createdUser.password; // Remove the password field from the returned user object
    return createdUser;
}
    
module.exports = {
    getAllUsers,
    createUser,
    registerUser,
    loginUser,
    findUserById,
    refreshAccessToken,
    findRefreshToken,
    saveRefreshToken
};