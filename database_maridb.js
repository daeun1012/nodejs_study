var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'dlekdms!@#$',
  db: 'o2'
});

/* var query = c.query("SELECT * FROM topic");
query.on('result', function(res) {
  // `res` is a streams2+ Readable object stream
  res.on('data', function(row) {
    console.dir(row.title);
    console.log(row.description);
  }).on('end', function() {
    console.log('Result set finished');
  });
}).on('end', function() {
  console.log('No more result sets!');
}); */

c.query('INSERT INTO topic (title, description, author)' +
        'VALUES(:title, :desc, :author)',
        { title: 'Nodejs',
          desc: 'Server side javascript',
          author: 'egoing'
         },
        function(err, rows) {
          if (err)
            throw err;
          console.dir(rows);
});

c.end();
