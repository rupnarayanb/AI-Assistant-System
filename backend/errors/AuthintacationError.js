
const AppError = require('./appErrors');

class AuthenticationError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = AuthenticationError;