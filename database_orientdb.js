var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'dlekdms!@#$'
});

// server.list()
//     .then(function (dbs) {
//       console.log('There are ' + dbs.length + ' databases on the server.');
//       for(var i = 0 ; i < dbs.length; i++) {
//         console.log(dbs[i].name);
//       }
//     });

var db = server.use('jodejs');
console.log('Using Database:', db.name);

// select
// var sql = 'select * from topic where @rid=:rid';
// var param = {
//   params:{
//     rid:'#22:0'
//   }
// };
// db.query(sql, param).then(function(results){
//   console.log(results);
// });

// insert
// var insertSql = "insert into topic(title, description) values(:title, :desc)";
// var insertParam = {
//   params:{
//     title:'Express',
//     desc:'Express is framework for web'
//   }
// }
// db.query(insertSql, insertParam).then(function (results) {
//   console.log(results);
// });

// update
// 몇개의 행이 수정되었는지 -> results
// var sql = "update topic set title=:title where @rid=:rid";
// db.query(sql, {params:{
//   title:'Expressjs',
//   rid:'#21:1'
// }}).then(function (results) {
//   console.log(results);
// });

// delete
var sql = 'delete from topic where @rid=:rid';
db.query(sql, {params: {
  rid:'#21:1'
}}).then(function (results) {
  console.log(results);
});
