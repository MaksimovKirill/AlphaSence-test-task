const path = require('path');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, splat, printf } = format;

module.exports = (name) => {
  if (!name) {
    name = path.basename(module.parent.filename, '.js');
    if (name === 'index') {
      name = path.basename(path.dirname(module.parent.filename));
    }
  }

  // eslint-disable-next-line arrow-body-style
  const myFormat = printf(({ level, message, label, timestamp, ...meta }) => {
    return `${timestamp} [${label}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  });

  const { NODE_ENV, LOG_LEVEL } = process.env;
  const level = NODE_ENV === 'development' ? 'debug' : 'info';

  const logger = createLogger({
    level: LOG_LEVEL || level,
    format: combine(
      label({ label: name }),
      splat(),
      timestamp(),
      myFormat,
    ),
    transports: [new transports.Console()],
  });

  return logger;
};

delete require.cache[__filename];
