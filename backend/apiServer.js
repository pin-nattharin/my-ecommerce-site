const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
