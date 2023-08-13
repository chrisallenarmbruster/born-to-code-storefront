const express = require('express');
const app = express.Router();
const { User, Order } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    console.log('inside orders post route ', req);
    const user = await User.findByToken(req.headers.authorization);
    const cart = await user.getCart();
    console.log('inside order post api route', req.body);

    const cartPropsToUpdate = [
      'shipToName',
      'email',
      'shipToAddress',
      'shipToCity',
      'shipToState',
      'shipToZip',
      'shipDate',
      'paymentMethod',
      'transactionId',
      'amount',
    ];

    cartPropsToUpdate.forEach((prop) => {
      if (req.body[prop]) {
        cart[prop] = req.body[prop];
      }
    });

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
    console.log('cart  put api route ', req.body);
    if (user === 'user not found' || !user || user === null) {
      res.send('user not found');
    } else {
      res.send(await user.addToCart(req.body));
    }
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log('api route ', req.body);
    res.send(await user.updateQuantity(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      res.send(await Order.findAll({ where: { isCart: false } }));
    } else {
      res.send(await user.getOrders({ where: { isCart: false } }));
    }
  } catch (ex) {
    next(ex);
  }
});
