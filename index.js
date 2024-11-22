const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];
function addTask(tasks, taskId, text, priority) {
  const newTask = { taskId, text, priority };
  tasks.push(newTask);
  return tasks;
}

function editByTaskIdandPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].priority == priority;
    }
  }
  return tasks;
}

function editText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].text == text;
    }
  }
  return tasks;
}

function deleteTask(task, taskId) {
  return task.taskId != taskId;
}

function findByPrority(task, priority) {
  return task.priority === priority;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let sortbypriority = tasks.sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortbypriority });
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let editpriority = editByTaskIdandPriority(tasks, taskId, priority);
  res.json({ tasks: editpriority });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editText(tasks, taskId, text);
  res.json({ tasks: result });
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => deleteTask(task, taskId));
  res.json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => findByPrority(task, priority));
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
