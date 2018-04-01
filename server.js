const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let mongoose = require('./data/mongoose');
let app = express();

let todoRoutes = require('./routes/todos');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req,res) {
  res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
