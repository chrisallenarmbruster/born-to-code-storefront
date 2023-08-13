const { Client } = require('square');
const randomUUID = require('crypto').randomUUID;
const express = require('express');
const { type } = require('os');
const app = express.Router();

module.exports = app;
console.log('square route ', process.env.SQUARE_ACCESS_TOKEN);
// const { User, Order } = require('../db');
const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox',
});

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.post('/', async (req, res, next) => {
    let { sourceId, amount } = req.body;
    console.log('aqmount', amount, typeof amount);

  try {
    console.log(req.body);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        currency: 'USD',
        amount: BigInt(amount),
      },
    });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
