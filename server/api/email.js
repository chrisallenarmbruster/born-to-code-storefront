const express = require('express');
const app = express();
const request = require('request');
const serverToken = 'd48b32f8-ef9f-4a3c-8f73-4e9d5f872b0f'; // replace with your Postmark API key
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
