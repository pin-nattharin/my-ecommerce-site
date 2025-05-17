const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const userFilePath = path.join(__dirname, '../data/user.json');

router.post('/', (req, res) => {
  const newUser = req.body;

  fs.readFile(userFilePath, 'utf8', (err, data) => {
    let users = [];
    
    if (!err && data) {
      users = JSON.parse(data);
    }

    users.push(newUser);

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: 'Error saving user data' });
      }
      res.json({ message: 'Register successfully' });
    });
  });
});

module.exports = router;
