const app = require('./index');
const logger = require('./utils/logger');

app.listen(3000, () => {
    logger.info("Server started");
    logger.warn("This is a warning");
    logger.error("This is an error");
    logger.debug("Debug information");
});