var express = require('express');
var session = require('express-session');
var app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: '123ABCD!@#$abcd',
  resave: false,
  saveUninitialized: true
}));

app.get('/count', function(req, res) {
  if(req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : ' + req.session.count);
});

app.get('/tmp', function(req, res) {
  res.send('result : ' + req.session.count);
});

app.listen(3000, function() {
  console.log('Connected 3000 port!!');
});