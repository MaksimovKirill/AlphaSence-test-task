module.exports = (app) => {
  app.start().then(() => {
    if(process.send) {
      // if run by pm2 or forked or spawned with IPC => have this defined
      process.send('ready');
    }
  }).catch(err => {
    app.log.error(`${err} stack trace: ${err.stack}`);
    process.exit(1);
  });

  process.on('unhandledRejection', unhandledRejection);
  process.on('rejectionHandled', rejectionHandled);
  process.on('SIGINT', gracefulShutdown);
  // For Windows system
  // Listen events to handle shutdown
  process.on('message', async msg => {
    if (msg === 'shutdown') {
      await gracefulShutdown();
    }
  });
  // If there are some uncaught exeptions - log, than kill process
  process.on('uncaughtException', err => {
    app.log.error({
      message: err.message,
      name:    err.name,
      errors:  err.errors,
      stack:   err.stack
    });
    process.exit(255);
  });

  async function gracefulShutdown(event) {
    // The process is going to be reloaded
    // Close all database/socket.io/* connections
  
    const dieDelay = app.options.timeout;
    // Not accepting new connections, closing socket.io (if used)
    setTimeout(() => {
      // just log, kill is accomplished by PM2
      app.log.error(`${app.name} is stopping for too long! Will be killed now!`);
      setTimeout(() => process.exit(1), 1000); // reserve method
    }, dieDelay - 100);
  
    app.log.info(`Closing the ${app.name}...`);
    await app.close();
    // messages below may be not in logs due to PM2 bug
    app.log.info(`${app.name} closed, exiting`);
  
    if (event === 'SIGUSR2') {
      process.kill(process.pid, 'SIGUSR2');
      return;
    }
  
    process.exit(0);
  }

  const unhandledRejections = new Map();

  // watch unhandled errors
  // https://nodejs.org/api/process.html#process_event_rejectionhandled
  function unhandledRejection(reason, promise) {
    promise.trackRejectionId = Math.random();

    setTimeout(function() { // 100 ms to catch up and handle rejection
      if (promise.trackRejectionId) { // if not rejectionHandled yet, report
        unhandledRejections.set(promise, reason);

        const report = {
          err: reason.toString(),
          trackRejectionId: promise.trackRejectionId,
          length: unhandledRejections.size
        };

        app.log.error(`unhandledRejection ${JSON.stringify(report)}`);
      }
    }, 100);
  };

  function rejectionHandled(promise) {
    if (unhandledRejections.has(promise)) {
      // too more than 100 ms to handle
      // already in the rejection list, let's report
      const reason = unhandledRejections.get(promise);
      const report = {
        err: reason.toString(),
        trackRejectionId: promise.trackRejectionId,
        length: unhandledRejections.size
      };

      unhandledRejections.delete(promise);

      app.log.error(`rejectionHandled ${JSON.stringify(report)}`);
    } else {
      // handled soon, don't track
      delete promise.trackRejectionId;
    }
  };
}