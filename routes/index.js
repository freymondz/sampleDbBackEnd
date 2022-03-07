import { Router } from 'express';
import { executeQueryAsPromise } from '../db.js';

const router = Router();

router.get('/', (req, res, next) => {
  res.send(`Yes I am working!`);
});

router.get('/showTables', (req, res, next) => {
  try {
    const query = "show tables;";
    executeQueryAsPromise(query, null)
      .then((queryResults) => {
        if (queryResults.length === 0) {
          queryResults = "No results found";
        }
        res.send(queryResults);
      }).catch((err) => { next(err); });
  } catch (err) { next(err); }
});

//* *********************************** */
//* ***********CREATE ROUTES*********** */
//* *********************************** */

router.post("/addOrUpdateUser", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `user` (`id`, `userName`, `status`) VALUES (?, ?, ?) ON duplicate key update `id`=values(`id`), `userName`=values(`userName`), `status`=values(`status`);\
    SELECT * FROM `user`";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateFolder", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `folder` (`id`, folderName, color, userId) VALUES (?, ?, ?, ?) on duplicate key update `id`=values(id), folderName=values(folderName), color=values(color), userId=values(userId);\
    SELECT * FROM `folder`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateServer", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
      INSERT INTO `server` (id, serverName) values (?, ?) on duplicate key update id=values(id), serverName=values(serverName);\
      SELECT * FROM `server`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateServer_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `server_member` (id, serverUserName, `status`, serverId) values (?, ?, ?, ?) on duplicate key update id=values(id), serverUserName=values(serverUserName), `status`=values(`status`), serverId=values(serverId);\
    SELECT * FROM `server_member`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateCategory", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `category` (id, `name`, serverId) values(?, ?, ?) on duplicate key update id=values(id), `name`=values(`name`), serverId=values(serverId);\
    SELECT  * FROM `category`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateVoice_channel", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `voice_channel` (id, `name`, categoryId) values(?, ?, ?) on duplicate key update id=values(id), `name`=values(`name`), categoryId=values(categoryId);\
    SELECT  * FROM `voice_channel`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateVoice_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `voice_member` (id, serverUserName, `status`, voiceChannelId) values(?, ?, ?, ?) on duplicate key update id=values(id), serverUserName=values(serverUserName),`status`=values(`status`), voiceChannelId=values(voiceChannelId);\
    SELECT * FROM `voice_member`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateText_channel", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `text_channel` (id, `name`, categoryId) values(?, ?, ?) on duplicate key update id=values(id), `name`=values(`name`), categoryId=values(categoryId);\
    SELECT * FROM `text_channel`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateText_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `text_member` (id, serverUserName, `status`, textChannelId) values(?, ?, ?, ?) on duplicate key update id=values(id), serverUserName=values(serverUserName), `status`=values(`status`), textChannelId=values(textChannelId);\
    SELECT * FROM `text_member`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addOrUpdateMessage", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `message` (id, `timeStamp`, textChannelId) values(?, ?, ?) on duplicate key update id=values(id), `timeStamp`=values(`timeStamp`), textChannelId=values(textChannelId);\
    SELECT * FROM `message`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addFolder-server", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `folder-server` (folderId, serverId) values(?, ?) on duplicate key update folderId=values(folderId), serverId=values(serverId);\
    SELECT * FROM `folder-server`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/addUser-server", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
      INSERT INTO `user-server` (userid, serverid) values(?, ?) on duplicate key update userid=values(userid), serverid=values(serverid);\
      SELECT * FROM `user-server`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

//* *********************************** */
//* ********RETRIEVE ROUTES************ */
//* *********************************** */
// Select queries can be done as gets

router.get('/getServer/:userid', (req, res, next) => {
  const inputs = [req.params.userid];
  const query = "\
    SELECT  serverid\
    FROM `user-server`\
    JOIN `server` ON `user-server`.serverid = `server`.id\
    WHERE userid = ?;";
  executeQueryAsPromise(query, inputs)
    .then(results => {
      if (results.length === 0) {
        res.send("No results found");
      } else {
        res.send(results);
      }
    }).catch((error) => {
      const issue = { issue: "There was a problem running your queries", error };
      console.log(issue);
      res.send(issue);
    });
});

router.get('/getFolder/:userId', (req, res, next) => {
  const inputs = [req.params.userId];
  const query = "\
    SELECT *\
    FROM folder\
    WHERE userId = ?;";
  executeQueryAsPromise(query, inputs)
    .then(results => {
      if (results.length === 0) {
        res.send("No results found");
      } else {
        res.send(results);
      }
    }).catch((error) => {
      const issue = { issue: "There was a problem running your queries", error };
      console.log(issue);
      res.send(issue);
    });
});

router.get('/getMessage/:serverId-:textId', (req, res, next) => {
  const inputs = [req.params.serverId, req.params.textId];
  const query = "\
  SELECT `text`, `timeStamp`\
  FROM `server`\
  JOIN category on `server`.id = category.serverId\
  JOIN text_channel on category.id = text_channel.categoryId\
  JOIN message on message.textChannelId = text_channel.id\
  WHERE serverId = ? and textChannelId = ?;";
  executeQueryAsPromise(query, inputs)
    .then(results => {
      if (results.length === 0) {
        res.send("No results found");
      } else {
        res.send(results);
      }
    }).catch((error) => {
      const issue = { issue: "There was a problem running your queries", error };
      console.log(issue);
      res.send(issue);
    });
});

//* *********************************** */
//* **********UPDATE ROUTES************ */
//* *********************************** */
// Update queries can be done as posts

router.post("/updateCardOrder", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    update card set `order`=? where id=?;\
    \
    select * from card order by listId, `order`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/updateListOrder", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
      update list set `order`=? where id=?;\
      \
      select * from list order by `order`;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

//* *********************************** */
//* **********DELETE ROUTES*********** */
//* *********************************** */

router.post("/deleteMessage", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    delete from message where id = ?;\
    select * from message;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/deleteText_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    delete from text_member where id = ?;\
    select * from text_member;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/deleteVoice_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
      delete from voice_member where id = ?;\
      select * from voice_member;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

router.post("/deleteServer_member", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    delete from server_member where id = ?;\
    select * from server_member;";
    executeQueryAsPromise(query, validatedInputs.placeholders)
      .then((queryResults) => {
        res.send(queryResults);
      }).catch((error) => {
        issue = { issue: "There was a problem running your queries", error };
        console.log(issue);
        res.send(issue);
      });
  } else {
    issue = { issue: "There was a problem validating your inputs", validatedInputs };
    console.log(issue);
    res.send(issue);
  }
});

//* *********************************** */
//* **********GENERIC ROUTES*********** */
//* *********************************** */
// These routes take care of any calls you make that are spelled wrong or have the wrong type
// No need to mess with them unless you are an experienced programmer

router.get('/*', (req, res, next) => {
  res.send(`The route you used:${req.originalUrl} was not found. Was it supposed to be a POST?`);
});
router.post('/*', (req, res, next) => {
  res.send(`The route you used:${req.originalUrl} was not found. Was it supposed to be a GET?`);
});

//* *********************************** */
//* **********SUPPORTING CODES********* */
//* *********************************** */
// This code is used by the routes.
// No need to mess with it unless you are an experienced programmer

function rowsToHtmlTable (results) {
  const tableStyle = '"border:1px solid black;padding:5px"';
  const cellStyle = '"border:1px solid black;padding:5px"';
  const cellStyleFirstRow = '"font-weight:600"';
  const htmlRows = results.map((row, index) => {
    const columns = Object.keys(row).map((columnName) => {
      return { columnName, columnValue: row[columnName] };
    });
    let htmlColumns = null;
    if (index === 0) {
      htmlColumns = columns.map((column) => {
        return `<th style=${cellStyleFirstRow}>${column.columnName}</th>`;
      });
    } else {
      htmlColumns = columns.map((column) => {
        return `<td style=${cellStyle}>${column.columnValue}</td>`;
      });
    }
    return `<tr>${htmlColumns.join("")}</tr>`;
  });
  return `<table style=${tableStyle}>${htmlRows.join("")}</table>`;
}

function validateAndFormatInputs (inputs) {
  const results = { inputsAreValid: true, validations: [], placeholders: [] };
  if (typeof (inputs) !== "object") {
    results.inputsAreValid = false;
    results.validations.push({ error: true, message: `Expecting an object, got: ${typeof (inputs)}` });
  }
  Object.keys(inputs).forEach((input) => {
    let valueOfInput = inputs[input];
    switch (input) {
      // add a case for any input that you want to validate
      case "id":
        if (valueOfInput != null && !Number.isInteger(valueOfInput)) {
          results.inputsAreValid = false;
          results.validations.push({ error: true, message: `In id value expecting null or an integer, got: ${valueOfInput}` });
        }
        break;
      case "dateAdded":
        if (valueOfInput === "*fillInCurrentDate*") valueOfInput = mysqlTimestamp();
        if (isNaN(Date.parse(valueOfInput))) {
          results.inputsAreValid = false;
          results.validations.push({ error: true, message: `This is not a valid date: ${valueOfInput}` });
        }
        break;
      case "email":
        if (!valueOfInput.includes("@")) {
          results.inputsAreValid = false;
          results.validations.push({ error: true, message: `There needs to be an @ in your email input, got: ${valueOfInput}` });
        }
        break;
    }
    results.placeholders.push(valueOfInput);
  });
  return results;
}

const mysqlTimestamp = () => {
  const date = new Date(Date.now());
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const min = date.getMinutes();
  const ss = date.getSeconds();
  const mysqlDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
  return mysqlDateTime;
};
export default router;
