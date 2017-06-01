# express-sql-session
[![Build Status](https://api.travis-ci.org/cobookman/express-sql-session.svg?branch=master)](https://travis-ci.org/cobookman/express-sql-session)

A SQL session store for [express.js](http://expressjs.com/)

## Installation

Add to your application via `npm`:
```
npm install express-sql-session --save
```
This will install `express-sql-session` and add it to your application's `package.json` file.


## How to Use

To use `express-sql-session`, simply use it with your express session middleware, like this:
```js
var express = require('express');
var app = module.exports = express();

var session = require('express-session');
var SessionStore = require('express-sql-session')(session);

var options = {
	client: 'mysql',
	connection: {
		host: 'localhost',
		port: 3306,
		user: 'session_test',
		password: 'password',
		database: 'session_test'
	},
	table: 'sessions',
	expires: 365 * 24 * 60 * 60 * 1000 // 1 year in ms
};

var sessionStore = new SessionStore(options)

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: true,
	saveUninitialized: true
}))
```

### Debugging

`express-sql-session` uses the [debug module](https://github.com/visionmedia/debug) to output debug messages to the console. To output all debug messages, run your node app with the `DEBUG` environment variable:
```
DEBUG=express-mysql-session* node your-app.js
```
This will output log messages as well as error messages from `express-sql-session`.

