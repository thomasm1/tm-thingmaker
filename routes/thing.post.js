'use strict';

module.exports = (handlers) => {
  return {
    method: 'POST',
    path: '/thing',
    config: {
      handler: handlers.thing
    }
  };
};
