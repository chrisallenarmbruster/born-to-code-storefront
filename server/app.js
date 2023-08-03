const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
// app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/products', require('./api/products'));
app.use('/api/users', require('./api/users'));
app.use('/api/reviews', require('./api/reviews'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
