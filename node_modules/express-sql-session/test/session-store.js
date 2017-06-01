var options = require('./config/database');
var session = require('express-session');
var SessionStore = require('../index')(session);

module.exports = new SessionStore(options);
