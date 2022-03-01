#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import { createServer } from 'http';

/**
 * Get port from environment and store in Express.
 */

// Only need to use this if the environment port is being set.
// https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
// const port = normalizePort(process.env.PORT || '4400');

const port = 4400;

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

// function normalizePort (val) {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  // console.log('Welcome to the backend app. I am listening on ' + bind);
  // console.log(`To see if I'm working type http://localhost:${addr.port} in your browser`);
  console.log(`
  Welcome to the backend app. I am listening on ${bind}
  To see if I'm working type http://localhost:${addr.port} in your browser
  `);
}
