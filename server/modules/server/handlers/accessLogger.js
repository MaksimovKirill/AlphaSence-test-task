module.exports = async (ctx, next) => {
  const { method, originalUrl, res, request } = ctx;
  const start = Date.now();

  ctx.app.log.info('--> %s %s', method, originalUrl, {
    event: 'request-start',
    method,
    referer: request.get('referer'),
    ua: request.get('user-agent'),
  });

  try {
    await next();
  } catch (err) {
    // log uncaught downstream errors
    log(err);
    throw err;
  }

  // log when the response is finished or closed,
  // whichever happens first.

  const onfinish = done.bind(null, 'finish');
  const onclose = done.bind(null, 'close');

  res.addListener('finish', onfinish);
  res.addListener('close', onclose);

  function done() {
    res.removeListener('finish', onfinish);
    res.removeListener('close', onclose);
    log(null);
  }

  /**
   * Log helper.
   */

  function log(err) {
    // get the status code of the response
    const status = err ? (err.status || 500) : (ctx.status || 404);

    ctx.app.log[err ? 'error' : 'info']('<-- %s %s', method, originalUrl, {
      event: 'request-end',
      method,
      status,
      timeDuration: Date.now() - start,
    });
  }
};
