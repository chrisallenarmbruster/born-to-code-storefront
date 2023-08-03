const express = require('express');
const app = express.Router();
const { Review } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    const existing = await Review.findOne({
      where: {
        userId: req.body.userId,
        productId: req.body.productId,
      },
    });
    if (existing) {
      existing.update({ rating: req.body.rating });
      return res.status(201).send(existing);
    }
    res.status(201).send(await Review.create(req.body));
  } catch (ex) {
    next(ex);
  }
});
