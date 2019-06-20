'use strict';

const thingStore = require('../data/things');

module.exports = (req, reply) => {
  thingStore.getRecentThings((err, things) => {
    const context = {
      auth: req.auth,
      things: things
    };

    return reply.view('index', context);
  });
};
