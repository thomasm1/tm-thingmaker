'use strict';

const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.server({
        port: 3007,
        host: 'localhost'
    });

    server.route({
        method: 'GET', // can be any HTTP method, array of methods, or *.
        path:'/',
        handler: (request, h) => {
            // handler must return a value, a promise, or throw error.
            return '<div><p style="padding:20px;color:darkblue;">Hello I\'m Tom</p></div>';
        }
    }); 

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
 

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();