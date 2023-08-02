const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await user.getCart();
    req.body.shipToCity && (cart.shipToCity = req.body.shipToCity);
    req.body.shipToName && (cart.shipToName = req.body.shipToName);
    req.body.shipToAddress && (cart.shipToAddress = req.body.shipToAddress);
    req.body.shipToState && (cart.shipToState = req.body.shipToState);
    req.body.shipToZip && (cart.shipToZip = req.body.shipToZip);
    req.body.email && (cart.email = req.body.email);
    req.body.shipDate && (cart.shipDate = req.body.shipDate);
    req.body.paymentMethod && (cart.paymentMethod = req.body.paymentMethod);
    req.body.transactionId && (cart.transactionId = req.body.transactionId);
    await cart.save();
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});
