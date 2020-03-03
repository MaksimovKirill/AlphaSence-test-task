const env = require('helpers/env');

module.exports = async (ctx, next) => {
  Object.assign(ctx, env);
  await next();
};
