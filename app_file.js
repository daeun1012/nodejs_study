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
  res.render('new');
});

app.get('/topic/:id', function (req, res) {
  var id = req.params.id;

  fs.readdir('data', function (err, files) {
    if(err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }

    fs.readFile('data/' + id, 'utf-8', function(err, data) {
      if(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
      res.render('view', {topics:files, title:id, description:data});
    });
  });
});

app.get('/topic', function (req, res) {
  fs.readdir('data', function (err, files) {
    if(err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render('view', {topics:files});
  });
});

app.post('/topic', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.send('Success!');
  });
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});
