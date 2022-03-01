import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// pulling __dirname from NODE doesn't work with ES6 syntax so we need to this as a workaround.
import { fileURLToPath } from 'url';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

// Originally indexRouter and stack were imported using the ES5 require syntax,
// however  translating this one to one to ES6 syntax doesn't work. Instead
// we have to import the router from index.js and then assign the stack from the router
// to a variable to use in this file.
import indexRouter from './routes/index.js';
const { stack } = indexRouter.stack;

import { connect, MODE_PRODUCTION } from './db.js';

connect(MODE_PRODUCTION)
  .then((response) => {
    console.log(response);
  }).catch((err) => {
    // console.log("********************");
    // console.log("Something went wrong with your connection to the MySQL server.");
    // console.log("Here are the most likely reasons:");
    // console.log("- You didn't set up a user named apiUser with the password !apisAreFun in Workbench");
    // console.log("- You somehow changed the user name: apiUser or password:!apisAreFun in the db.js file");
    // console.log("********************");
    // console.log('Here is the error message that MySQL gave us', err);
    console.log(`
    ********************
    Something went wrong with your connection to the MySQL server.
    Here are the most likely reasons:
    - You didn't set up a user named apiUser with the password !apisAreFun in Workbench
    - You somehow changed the user name: apiUser or password:!apisAreFun in the db.js file
    ********************
    Here is the error message that MySQL gave us ${err}
    `);
    process.exit(1);
  });

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // console.log("Error:", err.message);
  // console.log("StackTrace", err, stack);
  console.log(`
  Error: ${err.message}
  StackTrace ${err} ${stack}
  `);
  res.send("An error occurred, please check the console in the back end app");
  // https://stackoverflow.com/questions/29555290/what-is-the-difference-between-res-end-and-res-send
  // res.end();
});

export default app;
