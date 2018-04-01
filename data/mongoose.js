let mongoose = require('mongoose');

mongoose.set('debug', true);


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/todo-api');
mongoose.connect('mongodb://EmmaMorrison:myrnIOng3662@ds129939.mlab.com:29939/2v1-node-todo-api');
module.exports.Todo = require("../models/todo");
