//Main(Entry) Application
const express = require('express');
const app = express();
//static file dir
app.use(express.static('public'));

//router
//get 방식
app.get('/', function(req, res) {
  res.send('Welcome 2da\'s blog');
});

app.get('/login', function(req, res){
  res.send('Login please');
});

app.get('/route', function (req, res) {
  res.send('Hello Router, <img src="/2da.png">');
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});
