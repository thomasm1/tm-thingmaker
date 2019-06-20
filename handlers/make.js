'use strict';

const toppingStore = require('../data/toppings');

function makeThing (req, reply) {
  toppingStore.getAllToppings((err, toppings) => {
    let context = {
      toppings: toppings,
      auth: req.auth
    };
    return reply.view('thing.make.hbs', context);
  });
}

module.exports = (req, reply) => {
  switch (req.params.target) {
    case 'thing':
      makeThing(req, reply);
      break;
  }
};
