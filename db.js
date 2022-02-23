var mysql = require('mysql')


exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

mySQLConnection = {
  database: "trello",
  host: "localhost",
  user: "apiUser",
  port: 3306,
  password: "!apisAreFun",
  multipleStatements: true
}

exports.executeQueryAsPromise = function (query, values) {
  return new Promise(function (resolve, reject) {
    let rejectObject = { error: null, source: "executeQueryAsPromise", query: query }
    state.pool.query(query, values, (err, rows) => {
      if (err) {
        rejectObject.error = err
        return reject(rejectObject)
      }
      if (rows === undefined) {
        rejectObject.error = err;
        return reject(rejectObject)
      } else {
        return resolve(rows)
      }
    })
  })
}

exports.connect = function (mode) {
  return new Promise(function (resolve, reject) {
    const connection = mySQLConnection
    state.pool = mysql.createPool(connection)
    state.pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err)
      } else {
        state.mode = mode
        return resolve(`Connected successfully to the ${mySQLConnection.database} database on ${mySQLConnection.host}`)
      }
    })

  })
}



