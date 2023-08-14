const express = require('express');
const app = express();
const request = require('request');
const serverToken = process.env.POSTMARK_API_KEY;
module.exports = app;

app.use(express.json());

app.post('/', async (req, res, next) => {
  const url = 'https://api.postmarkapp.com/email';
  const headers = {
    'X-Postmark-Server-Token': serverToken,
    'Content-Type': 'application/json',
  };

  request(
    { url, headers, method: 'POST', json: req.body },
    (error, response, body) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        res.send(body);
      }
    }
  );
});
