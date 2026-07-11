const db = require('../db');
const USERS_QUERY = 'SELECT * FROM users';


async function getAllUsers() {
    const result = await db.query(USERS_QUERY);
    return result.rows;
}

module.exports = {
    getAllUsers
};