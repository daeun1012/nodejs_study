const express = require('express');
const bodyParser = require('body-parser');
const OrientDB = require('orientjs');
const fs = require('fs');
const app = express();

app.locals.pretty = true;

//orientDB
var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'dlekdms!@#$'
});
var db = server.use('jodejs');
console.log('Using Database:', db.name);

//pug (jade)
app.set('view engine', 'pug');
app.set('views', './views_orientdb');

//bodyParser (post method)
app.use(bodyParser.urlencoded({extended:false}));

app.get(['/topic', '/topic/:id'], function (req, res) {
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function (topics) {
    var id = req.params.id;
    if(id) {
      console.log("id!!!");
      var sql = 'SELECT FROM topic WHERE @rid=:rid';
      db.query(sql, {params:{rid:id}}).then(function (topic) {
        res.render('view', {topics:topics, topic:topic[0]});
      });
    } else {
      console.log("none!!!");
      res.render('view', {topics:topics});
    }
  });
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});

function showError(err, res) {
  console.log(err);
  res.status(500).send('Internal Server Error');
}
