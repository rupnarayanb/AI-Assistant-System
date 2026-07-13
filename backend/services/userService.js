const db = require('../db');
const USERS_QUERY = 'SELECT * FROM users';
const queryText = `INSERT INTO users(name, role ) VALUES($1, $2) RETURNING *`;



async function getAllUsers() {
    const result = await db.query(USERS_QUERY);
    return result.rows;
}

async function createUser(userdata) {
     const queryValues = [userdata.name,userdata.role];
    const result = await db.query(queryText, queryValues);
    return result.rows[0];
}

module.exports = {
    getAllUsers,
    createUser
};