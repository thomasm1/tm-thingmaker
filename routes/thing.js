'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/thing/{thingId}',
    config: {
      handler: handlers.thing,
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  };
};
