const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFile = path.join(__dirname, '../data/user.json');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt with username: ${username}`);

  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
        console.error("Read error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
        

    const users = JSON.parse(data);
    const user = users.find(u => u.email === username);

     if (!user) {
      return res.status(400).json({ message: 'Incorrected Username' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrected Password' });
    }

    return res.json({ message: 'Login successfully' });
  });
});

module.exports = router;
