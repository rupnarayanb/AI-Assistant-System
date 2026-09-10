const app = require('./app');
const logger = require('./utils/logger');

app.listen(3000, () => {
    logger.info("Server started");
    logger.warn("This is a warning");
    logger.error("This is an error");
    logger.debug("Debug information");
});