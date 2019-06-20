'use strict';

const async = require('async'),
  userStore = require('../data/users'),
  thingStore = require('../data/things'),
  toppingsStore = require('../data/toppings');

function getThing (req, reply) {
  async.parallel([
    toppingsStore.getAllToppings,
    (callback) => {
      thingStore.getThing(req.params.thingId, callback);
    }
  ], (err, data) => {
    let context = {
      toppings: data[0],
      thing: data[1],
      auth: req.auth
    };
    return reply.view('thing', context);
  });
}

function postThing (req, reply) {
  let data = req.payload,
    name = data.name,
    toppings = data.toppings,
    username = data.username,
    img = data.img;
  thingStore.createThing(name, toppings, img, username, (err, thing) => {
    if (err) {
      console.log('error on putting s3 object: ' + err);
      return reply(Boom.badImplementation('Could not create thing.'));
    }
    return reply();
  });
}

module.exports = (req, reply) => {
  if (req.method === 'get') {
    getThing(req, reply);
  } else if (req.method === 'post') {
    postThing(req, reply);
  }
};
