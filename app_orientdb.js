const express = require('express');
const bodyParser = require('body-parser');
const OrientDB = require('orientjs');
const app = express();

app.locals.pretty = true;

//orientDB
var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'dlekdms!@#$'
});
var db = server.use('nodejs');
console.log('Using Database:', db.name);

//pug (jade)
app.set('view engine', 'pug');
app.set('views', './views_orientdb');

//bodyParser (post method)
app.use(bodyParser.urlencoded({extended:false}));

//route의 순서 중요
app.get('/topic/add', function (req, res) {
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function (topics) {
    // if(topics.length === 0) {
    //   showError('There is no topic record.', res);
    // }
    res.render('add', {topics:topics});
  });
});

app.post('/topic/add', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, autor) VALUES(:title, :desc, :author)';
  db.query(sql, {
    params:{
      title: title,
      desc: description,
      author: author
    }
  }).then(function (results) {
    res.redirect('/topic/' + encodeURIComponent(results[0]['@rid']));
  });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function (topics) {
    var id = req.params.id;
    if(id) {
      var sql2 = 'SELECT FROM topic WHERE @rid=:rid';
      var decodeId = decodeURIComponent(id);
      db.query(sql2, {
        params:{
          rid:decodeId
        }
      }).then(function (topic) {
        console.log('title : ' + topic.title);
        res.render('view', {topics:topics, topic:topic});
      });
    } else {
      res.render('view', {topics: topics});
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
