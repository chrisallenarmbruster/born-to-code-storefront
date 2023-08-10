const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/signup', async (req, res, next) => {
  try {
    await User.findOrCreate({
      where: { username: req.body.username },
      defaults: { password: req.body.password },
    });
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

app.put('/', async(req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
