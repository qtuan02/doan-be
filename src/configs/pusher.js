const appConfig = require('./env.config');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: appConfig.PUSHER_ID,
  key: appConfig.PUSHER_KEY,
  secret: appConfig.PUSHER_SECRET,
  cluster: appConfig.PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = pusher;