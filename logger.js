const fs = require('fs');

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const env = process.env.NODE_ENV || 'development';
const logDir = './log';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'debug',
  filename: `${ logDir }/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS', 
    }),
    format.json()
  ),
  transports: [ 
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${ info.timestamp } ${ info.level } : ${ info.message }`,
        )
      ),
    }), 
    dailyRotateFileTransport,
  ],
});

module.exports = {
  logger,
}
