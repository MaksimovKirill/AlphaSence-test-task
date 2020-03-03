module.exports = {
  port: parseInt(process.env.PORT, 10) || 3010,
  host: process.env.HOST || '0.0.0.0',
  // 5s to let all connections finish
  timeout: parseInt(process.env.PM2_GRACEFUL_TIMEOUT, 10) || 5 * 1000,
};
