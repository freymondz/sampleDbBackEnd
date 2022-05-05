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
    const query = "INSERT INTO `user` (id,`firstName`, `lastName`, `password`, `avatar`, `initials`, `email`, `bio`, `active`, `dateAdded`) VALUES \
    (?,?,?,?,?,?,?,?,?,?) \
    on duplicate key update firstName=values(firstName), lastName=values(lastName), password=values(password), avatar=values(avatar), \
    initials=values(initials), email=values(email), bio=values(bio), active=values(active), dateAdded=values(dateAdded) ;\
    \
    select * from `user`";
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

router.post("/addOrUpdateBoard", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO `trello`.`board` (id,`title`, `route`, `isPrivate`, `description`, `background`, `settings`) VALUES \
    (?,?,?,?,?,?,?) \
    on duplicate key update title=values(title), route=values(route), isPrivate=values(isPrivate), description=values(description), background=values(background), settings=values(settings);\
    \
    SELECT * FROM trello.board;";
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

router.post("/addOrUpdateList", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    insert into list (id,title,boardId,`order`) values \
    (?,?,?,?) \
    on duplicate key update title=values(title); \
    \
    select * from list;";
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

router.post("/addOrUpdateUserBoard", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    insert into `user-board` (userId,boardId,madeBy,watch) values \
    (?,?,?,?) \
    on duplicate key update madeBy=values(madeBy),watch=values(watch); \
    \
    select * from `user-board`;";
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

router.post("/addOrUpdateCard", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    INSERT INTO card (id, title, `description`, `order`, cover, dateDue, listId) VALUES \
    (?,?,?,?,?,?,?)\
    on duplicate key update title=values(title), `description`=values(`description`), `order`=values(`order`), cover=values(cover), dateDue=values(dateDue), listId=values(listId); \
    \
    select * from card;";
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

router.get('/getBoardUsers/:boardId', (req, res, next) => {
  const inputs = [req.params.boardId];
  const query = "\
    select user.* \
    from user\
    join `user-board`  on `user-board`.userId = user.id\
    join board on `user-board`.boardId = board.id\
    where boardId = ?;";
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

router.get('/getBoardAndListsAndCards/:boardId', (req, res, next) => {
  const inputs = [req.params.boardId];
  const query = "\
    select board.*,list.*,card.*\
    from board\
    join list on list.boardId = board.id\
    join card on card.listId=list.id\
    where board.id = ?;  ";
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

router.get('/getCard/:cardId', (req, res, next) => {
  const cardId = req.params.cardId;
  const inputs = [cardId, cardId, cardId, cardId];
  const query = "\
    select * from card where id=?;\
    \
    select activity.cardId as cardId, \
    activity.id as activityId, \
    activity.content, \
    activity.dateCreated,\
    `user-activity`.watch, `user-activity`.isCreator,\
    `user`.id as userId, concat(`user`.firstName, ' ', `user`.lastName) as userName\
    from activity\
    join `user-activity` on `user-activity`.activityId=activity.id\
    join `user` on `user`.id = `user-activity`.userId\
    where activity.cardId = ?;\
    \
    select\
    card.id as cardId,\
    `user`.id as userId, \
    `user-card`.watch, \
    `user-card`.isCreator,\
    concat(`user`.firstName, ' ', `user`.lastName) as userName\
    from card \
    join `user-card` on `user-card`.cardId = card.id\
    join user on `user-card`.userId = user.id\
    where cardId=?;\
    \
    select\
    card.id as cardId,\
    label.id as labelId,\
    label.name,label.color\
    from card \
    join `card-label` on `card-label`.cardId = card.id\
    join label on `card-label`.labelId = label.id\
    where cardId =?;\
    \
    select\
    card.id as cardId,\
    checklist.id as checklistId,\
    checklist_item.id as checklistItemId,\
    checklist_item.title,checklist_item.content,checklist_item.dateDue\
    from card \
    join checklist on checklist.cardId = card.id\
    join checklist_item on checklist_item.checklistId = checklist.id\
    where cardId =1;\
    ";
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

router.post("/deleteUser", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
    delete from user where id = ?;\
    \
    select * from user;";
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

router.post("/deleteBoard", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
      delete from board where id = ?;\
      \
      select * from board;";
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

router.post("/deleteList", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
        delete from list where id = ?;\
        \
        select * from list;";
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

router.post("/deleteCard", (req, res, next) => {
  const { inputs } = req.body;
  let issue = null;
  const validatedInputs = validateAndFormatInputs(inputs);
  if (validatedInputs.inputsAreValid) {
    const query = "\
        delete from card where id = ?;\
        \
        select * from card;";
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
  res.send(`The route you used:${encodeURI(req.originalUrl)} was not found. Was it supposed to be a POST?`);
});
router.post('/*', (req, res, next) => {
  res.send(`The route you used:${encodeURI(req.originalUrl)} was not found. Was it supposed to be a GET?`);
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
