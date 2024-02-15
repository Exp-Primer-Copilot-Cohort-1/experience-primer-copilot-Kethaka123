// Create web server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

// Read file
app.get('/listUsers', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.end(data);
  });
});

// Add new user
app.post('/addUser', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  console.log(response);
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    data["user4"] = response;
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

// Show user detail
app.get('/:id', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse(data);
    var user = users["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

// Delete user
app.delete('/deleteUser/:id', function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    delete data["user" + req.params.id];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
