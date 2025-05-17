const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const userFilePath = path.join(__dirname, '../data/user.json');

router.post('/', (req, res) => {
  const { fname, lname, email, password, category, occupation } = req.body;
  console.log('Received registration data:', req.body);

  if (!fname || !lname || !email || !password || !category || !occupation) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  fs.readFile(userFilePath, 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    const existingUser  = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'This email has already been used.' });
    }

    const newUser = { fname, lname, email, password, category, occupation };
    users.push(newUser);

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error("Write error:", err);
        return res.status(500).json({ message: 'Failed to save user' });
      }
      return res.json({ message: 'Register successfully' });
    });
  });
});

module.exports = router;
