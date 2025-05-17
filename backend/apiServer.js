const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRoute = require('./routes/register');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registerRoute);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
