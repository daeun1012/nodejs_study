var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('123ABCD!@#$'));

var products = {
  1: {
    id: 1,
    title: 'The history of web 1'
  },
  2: {
    id: 2,
    title: 'The next web'
  }
};

app.get('/products', function(req, res) {
  var output = '';
  for(var item in products) {
    output += `
    <li>
      <a href="/cart/${products[item].id}">${products[item].title}</a>
    </li>
    `;
  }
  res.send(`<h1>Products</h1><ul>${output}</ul>
    <a href="/cart">Cart</a>`);
});

app.get('/cart/:id', function(req, res) {
  var id = req.params.id;
  var cart = {};
  if(req.signedCookies.cart) {
    cart = req.signedCookies.cart;
  }
  //카트에 담긴 객체(물건)이 없을때 0으로 갯수 초기화
  if(!cart[id]) {
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie('cart', cart, {signed: true});
  res.redirect('/cart');
});

app.get('/cart', function(req, res) {
  var cart = req.signedCookies.cart;
  if(!cart) {
    res.send('Empty');
  } else {
    var output = ``;
    for(var itemId in cart) {
      output += `<li>${products[itemId].title} (${cart[itemId]})</li>`;
    }
    res.send(`
      <h1>Cart</h1>
      <ul>${output}</ul>
      <a href="/products">Products List</a>`);
  }
});

app.get('/count', function(req, res) {
  var count = 0;
  if(req.signedCookies.count) {
    count = parseInt(req.signedCookies.count);
  }

  res.cookie('count', ++count, {signed: true});
  res.send('count : ' + count);
});

app.listen(3000, function() {
  console.log('Connected 3000 port!!');
});
