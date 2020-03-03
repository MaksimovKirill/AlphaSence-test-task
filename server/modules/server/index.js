const Koa = require('koa');
const logger = require('helpers/logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./routes');
const storage = require('../data/storage.json');

class Server extends Koa {
  constructor(options) {
    super();
    this.name = 'App Server'
    this.options = options;
    this.log = logger('server');
    this.storage = storage;
  }

  async start() {
    this.use(cors({
      origin: '*'
    }));
    this.use(bodyParser());
    this.use(require('./handlers/envChecker'));
    this.use(require('./handlers/accessLogger'));
    this.use(require('./handlers/errorHandler'));

    this.use(router.routes());
    // this.use(router.allowMethods());

    const { host, port, timeout } = this.options;
    await new Promise(resolve => this.server = this.listen(port, host, resolve));
    
    // Sets the timeout value for sockets
    // Default 2 min
    // https://nodejs.org/api/http.html#http_server_settimeout_msecs_callback
    this.server.setTimeout(timeout);

    this.log.info('%s is listening %s:%d in %s mode', this.name, host, port, this.env);
  }

  async close() {
    if(this.server) {
      this.log.info(`Closing ${this.name}...`);

      await new Promise(resolve => this.server.close(resolve));

      this.log.info(`${this.name} connection are closed`);
    } else {
      this.log.info(`${this.name} is not running`);
    }
    
    this.log.info(`${this.name} stopped`);
  }
}

module.exports = Server;
