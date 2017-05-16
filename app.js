//Main(Entry) Application
const express = require('express');
const app = express();
//pug code pretty
app.locals.pretty = true;
//pug (jade)
app.set('view engine', 'pug');
app.set('views', './views');
//static file dir
app.use(express.static('public'));

//router
//get 방식
app.get('/', function(req, res) {
  res.send('Welcome 2da\'s blog');
});

app.get('/template', function(req, res) {
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/dynamic', function (req, res) {
  var time = Date();
  var lis = '';
  for(var i = 0; i < 5; i++) {
    lis = lis + '<li>coding</li>';
  }
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
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
