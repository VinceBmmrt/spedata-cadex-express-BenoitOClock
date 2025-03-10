const winston = require('winston');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'http';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  // new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/all.log',
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),

];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
