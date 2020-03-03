const Router = require('@koa/router');
const router = new Router();

router.get('/channels', getChannels);
router.get('/channels/:id', getMessages);
router.post('/channels/:id', postMessage);

async function getChannels(ctx) {
  ctx.body = ctx.app.storage.channels;
  ctx.status = 200;
}

async function getMessages(ctx) {
  const channel = ctx.app.storage.channels
    .find(channel => channel.id === +ctx.params.id) 
  ctx.body = channel.messages;
  ctx.status = 200;
}

async function postMessage(ctx) {
  const channel = ctx.app.storage.channels
    .find(channel => channel.id === +ctx.params.id);

  const message = ctx.request.body;
  message.id = channel.messages.length;
  channel.messages.push(message);
  ctx.body = message;
  ctx.status = 200;
}

module.exports = router;
