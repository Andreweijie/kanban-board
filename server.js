const express = require("express");
const Datastore = require("nedb");
const bodyParser = require("body-parser");

let taskdb = new Datastore({ filename: "db/task.db", autoload: true });
let columndb = new Datastore({ filename: "db/column.db", autoload: true });
let boarddb = new Datastore({ filename: "db/board.db", autoload: true });

const app = express();
app.use(bodyParser.json());

//endpoint for adding a new task
app.post("/new-task", (req, res) => {
  const newTask = req.body;
  taskdb.insert(newTask, (err, docs) => {
    if (err) {
      console.log(err);
    }
    res.json(docs);
  });
});

//endpoint for creating a new board
app.get("/new-board", (req, res) => {
  let newBoard = { name: req.query.board };
  boarddb.insert(newBoard, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "success", name: docs.name });
    }
  });
});

//endpoint for creating a new column
app.get("/new-column", (req, res) => {
  let newColumn = { name: req.query.column, board: req.query.board };
  columndb.insert(newColumn, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "success", name: docs.name, board: docs.board });
    }
  });
});

//endpoint for updating list of subtasks
app.post("/update-sub", (req, res) => {
  taskdb.update(
    {
      name: req.body.name,
      column: req.body.column,
      board: req.body.board
    },
    { $set: { subTasks: req.body.subTasks } },
    { multi: false },
    function(err, numReplaced) {
      console.log(numReplaced);
    }
  );
});
//endpoint for retrieving list of boards
app.get("/boards", (req, res) => {
  boarddb.find({}, (err, docs) => {
    res.json(docs);
  });
});

//endpoint for retrieving list of columns
app.get("/columns", (req, res) => {
  let boardName = req.query.board;
  columndb.find({ board: boardName }, (err, docs) => {
    res.json(docs);
  });
});

//endpoint for retrieving list of tasks
app.get("/tasks", (req, res) => {
  let boardName = req.query.board;
  let columnName = req.query.column;

  taskdb.find({ board: boardName, column: columnName }, (err, docs) => {
    if (err) {
      console.log(err);
    }

    res.json(docs);
  });
});

//endpoint for deleting a task
app.get("/delete-task", (req, res) => {
  taskdb.remove({ _id: req.query.id }, {}, function(err, numRemoved) {
    // numRemoved = 1
    res.json(numRemoved);
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
