const winston = require("winston");
const { S3StreamLogger } = require("s3-streamlogger");

const s3_stream = new S3StreamLogger({
  bucket: "mytmptestbucket123",
});

const transport = new winston.transports.Stream({
  stream: s3_stream,
});
// see error handling section below
transport.on("error", function (err) {
  console.log(err);
});

const logger = winston.createLogger({
  transports: [transport],
});

logger.info("Hello Winston!");

module.exports = {
  logger,
};
