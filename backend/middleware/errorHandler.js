const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error({ message: err.message, stack: err.stack });
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        status: statusCode
    });
};

module.exports = errorHandler;      