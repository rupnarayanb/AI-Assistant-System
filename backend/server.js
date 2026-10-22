const app = require('./index');
const logger = require('./utils/logger');
const config = require('./config/config');

app.listen(config.server.port, () => {
    logger.info("Server started at port " + config.server.port);
    logger.warn("This is a warning");
    logger.error("This is an error");
    logger.debug("Debug information");
});