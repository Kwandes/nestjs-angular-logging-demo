import { log } from './logger.js';

const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const start = process.hrtime();
  next();
  res.on('finish', () => {
    const durationInMilliseconds =
      getActualRequestDurationInMilliseconds(start);
    const status = res.statusCode;
    const message = `${method} '${url}' ${status} ${durationInMilliseconds.toLocaleString()} ms`;
    log.info(message);
  });
};

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export { requestLogger };
