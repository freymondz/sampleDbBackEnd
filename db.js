import { createPool } from 'mysql';

export const MODE_TEST = 'mode_test';
export const MODE_PRODUCTION = 'mode_production';

const state = {
  pool: null,
  mode: null
};

const mySQLConnection = {
  database: "discord",
  host: "localhost",
  user: "apiUser",
  port: 3306,
  password: "!apisAreFun",
  multipleStatements: true
};

export function executeQueryAsPromise (query, values) {
  return new Promise((resolve, reject) => {
    const rejectObject = { error: null, source: "executeQueryAsPromise", query: query };
    state.pool.query(query, values, (err, rows) => {
      if (err) {
        rejectObject.error = err;
        return reject(rejectObject);
      }
      if (rows === undefined) {
        rejectObject.error = err;
        return reject(rejectObject);
      } else {
        return resolve(rows);
      }
    });
  });
}

export function connect (mode) {
  return new Promise((resolve, reject) => {
    const connection = mySQLConnection;
    state.pool = createPool(connection);
    state.pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      } else {
        state.mode = mode;
        return resolve(`Connected successfully to the ${mySQLConnection.database} database on ${mySQLConnection.host}`);
      }
    });
  });
}
