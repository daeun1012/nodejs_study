const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Client = require('mariasql');

const c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'dlekdms!@#$',
  db: 'o2'
});

const app = express();

app.locals.pretty = true;

//pug (jade)
app.set('view engine', 'pug');
app.set('views', './views_mariadb');

//bodyParser (post method)
app.use(bodyParser.urlencoded({extended:false}));

app.get('/topic/add', function (req, res) {
  c.query('SELECT id, title FROM topic', function(err, topics) {
    if(err)
      showError(err, res);
    res.render('add', {topics:topics, isEmpty: true});
  });
});

app.post('/topic/add', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var params = [title, description, author];
  c.query('INSERT INTO topic (title, description, author) VALUES (?, ?, ?)', params, function(err, result) {
    if(err)
      showError(err, res);
    res.redirect('/topic/' + result.info.insertId);
  });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
  c.query('SELECT id, title FROM topic', function(err, topics) {
    var id = req.params.id;
    if (err) {
      showError(err, res);
    } else if(id) {
      c.query('SELECT * FROM topic WHERE id = ' + id ,
              function(err, topic) {
                if (err)
                  showError(err, res);
                res.render('view', {topics:topics, topic:topic[0], isEmpty:false});
      });
    } else {
      console.log('empty id');
      res.render('view', {topics:topics, isEmpty: true});
    }
  });
});

app.get('/topic/:id/edit', function(req, res) {
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics) {
    var id = req.params.id;
    if(err) {
      showError(err, res);
    } else if(id){
      c.query('SELECT * FROM topic WHERE id = ' + id, function(err, topic) {
        if(err)
          showError(err, res);
        res.render('edit', {topics:topics, topic:topic[0], isEmpty:false});
      });
    } else {
      showError('There is no id.', res);
    }
  });
});

app.post('/topic/:id/edit', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  c.query(sql, [title, description, author, id], function(err, topic) {
    if(err)
      showError(err, res);
    res.redirect('/topic/'+id);
  });
});

app.get('/topic/:id/delete', function(req, res) {
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics) {
    var id = req.params.id;
    if(err) {
      showError(err, res);
    } else if(id){
      c.query('SELECT * FROM topic WHERE id = ' + id, function(err, topic) {
        if(err)
          showError(err, res);
        res.render('delete', {topics:topics, topic:topic[0], isEmpty:false});
      });
    } else {
      showError('There is no id.', res);
    }

  });
});

app.post('/topic/:id/delete', function(req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  c.query(sql, [id], function(err, result) {
    res.redirect('/topic/');
  });
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});

function showError(err, res) {
  console.log(err);
  res.status(500).send('Internal Server Error');
}
