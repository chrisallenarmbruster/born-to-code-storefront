const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user.isAdmin) {
      const error = new Error('not authorized');
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

app.get('/', requireAdmin, async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const loggedInUser = await User.findByToken(req.headers.authorization);
    const user = await User.findByPk(req.params.id);
    if (!loggedInUser.isAdmin && loggedInUser.id !== req.params.id) {
      const error = new Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const loggedInUser = await User.findByToken(req.headers.authorization);
    const user = await User.findByPk(req.params.id);
    if (!loggedInUser.isAdmin && loggedInUser.id !== req.params.id) {
      const error = new Error('not authorized');
      error.status = 401;
      throw error;
    }
    console.log("req body: ", req.body);
    const updatedUser = await user.update(req.body);
    console.log("updated user: ", updatedUser);
    res.send(updatedUser);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', requireAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});
