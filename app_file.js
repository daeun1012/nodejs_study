const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.locals.pretty = true;

//pug (jade)
app.set('view engine', 'pug');
app.set('views', './views_file');

//bodyParser (post method)
app.use(bodyParser.urlencoded({extended:false}));

app.get('/topic/new', function (req, res) {
  fs.readdir('data', function (err, files) {
    if(err) {
      showError(err, res);
    }
    res.render('new', {topics:files});
  });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
  fs.readdir('data', function (err, files) {
    if(err) {
      showError(err, res);
    }
    var id = req.params.id;
    if(id) {
      //id값이 있을때
      fs.readFile('data/' + id, 'utf-8', function(err, data) {
        if(err) {
          showError(err, res);
        }
        res.render('view', {topics:files, title:id, description:data});
      });
    } else {
      //id값이 없을때
      res.render('view', {topics:files, title:'Welcome', description:'Hello, Javascript for Server'});
    }
  });
});

app.post('/topic', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      showError(err, res);
    }
    res.redirect('/topic/' + title);
  });
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});

function showError(err, res) {
  console.log(err);
  res.status(500).send('Internal Server Error');
}
