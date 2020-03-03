module.exports = async (ctx, next) => {
  ctx.sendError = err => sendError(ctx, err);

  try {
    await next();
  } catch (err) {
    sendError(ctx, err);
  }
};

function sendError(ctx, err) {
  if (!(err instanceof Error)) {
    // eslint-disable-next-line no-param-reassign
    err = new Error(err);
  }
  let stack = err.stack.split('\n').slice(1).map(v => v.replace('    at ', ''));
  // don't pass just err, because for "stack too deep" errors it leads to logging problems

  const report = {
    code: err.code,
    message: err.message,
    status: err.status,
    stack,
  };

  ctx.app.log.error(report);

  ctx.status = +err.status || 500;
  ctx.body = {
    status: 'error',
    error: err.code,
    message: err.message,
    statusCode: err.status,
  };

  if (ctx.isDevelopment) {
    ctx.body.stack = stack;
  }
};
