const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.info('Route: /');
  return res.json({ message: '/' });
})

app.get('/teste', (req, res) => {
  console.info('Route: /teste');
  return res.json({ message: '/teste' });
})

app.listen(3000);