const express = require('express');
const app = express.Router();
const { Review, User } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const existing = await Review.findOne({
      where: {
        userId: user.id,
        productId: req.body.productId,
      },
    });
    if (existing) {
      existing.update({ rating: req.body.rating });
      return res.status(201).send(existing);
    } else {
      const reviewProps = {
        userId: user.id,
        productId: req.body.productId,
        rating: req.body.rating,
      };
      res.status(201).send(await Review.create(reviewProps));
    }
  } catch (ex) {
    next(ex);
  }
});

app.get('/products/:productId/users/:userId', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.id !== req.params.userId && !user.isAdmin) {
      res.sendStatus(401);
    } else {
      const review = await Review.findOne({
        where: {
          productId: req.params.productId,
          userId: req.params.userId,
        },
      });

      res.send(review);
    }
  } catch (ex) {
    next(ex);
  }
});
