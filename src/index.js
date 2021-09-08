const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: '/' });
})

app.get('/teste', (req, res) => {
  return res.json({ message: '/teste' });
})

app.listen(3000);