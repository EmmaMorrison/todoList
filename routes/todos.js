let express = require('express');
let router = express.Router();
let db = require('../data/mongoose');
let helpers = require('../helpers/todo_routes');

router.route('/')
.get(helpers.getAllTodos)
.post(helpers.createTodo);

router.route('/:todoId')
.get(helpers.getATodo )
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);

module.exports = router;
