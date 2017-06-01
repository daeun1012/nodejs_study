var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var SessionStore = require('express-sql-session')(session);
var app = express();

var options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'dlekdms!@#$',
        database: 'o2'
    },
    table: 'sessions',
    expires: 365 * 24 * 60 * 60 * 1000 // 1 year in ms
};

var sessionStore = new SessionStore(options);

app.use(bodyParser.urlencoded({extended:false}));
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: '123ABCD!@#$abcd',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

app.get('/count', function(req, res) {
  if(req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : ' + req.session.count);
});

app.get('/auth/login', function(req, res) {
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', function(req, res) {
  var user = {
    username:'2da',
    password:'111',
    displayName:'이다'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  console.log(uname);
  console.log(pwd);
  if(uname === user.username && pwd === user.password) {
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  }
  res.send('Who are you? <a href="/auth/login">login</a>');
});

app.get('/welcome', function(req, res) {
  if(req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
    `);
  }else {
    res.send(`
      <h1>Welcome!</h1>
      <a href="/auth/login">Login</a>
    `);
  }
});

app.get('/auth/logout', function(req, res) {
  delete req.session.displayName;
  res.redirect('/welcome');
});

app.listen(3000, function() {
  console.log('Connected 3000 port!!');
});
