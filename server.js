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
      console.log(docs);
      res.json({ message: "success", newBoard: docs.name });
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
      console.log(docs);
      res.json({ message: "success", newcolumn: docs.name, board: docs.board });
    }
  });
});

//endpoint for retrieving list of boards
app.get("/boards", (req, res) => {
  boarddb.find({}, (err, docs) => {
    console.log(docs);
    res.json(docs);
  });
});

//endpoint for retrieving list of columns
app.get("/columns", (req, res) => {
  let boardName = req.query.board;
  columndb.find({ board: boardName }, (err, docs) => {
    console.log(docs);
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
    console.log(docs);
    res.json(docs);
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
