const db = require('../db');
const USERS_QUERY = 'SELECT * FROM users';
const queryText = `INSERT INTO users(name, role ) VALUES($1, $2) RETURNING *`;
const queryTextForRegister = `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`;
const checkEmailQuery = `SELECT * FROM users WHERE email = $1`;
const bcrypt = require('bcrypt');




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
        throw new Error('User not found');
    }
   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        delete user.password; // Remove the password field from the returned user object
        return user;
   
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
    registerUser
};