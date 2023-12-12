const winston = require("winston");
const s3_upload = require("./s3_upload");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.on("data", (chunk) => {
  // log listener
  s3_upload(JSON.stringify(chunk)); // call s3 uploader and pass stringyfied json log
});

const info = (message) => {
  logger.info(message);
};

const error = (error) => {
  logger.error(error.toString());
};
module.exports = {
  info,
  error,
};
