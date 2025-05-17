const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {fname, lname, category, occupation, email, password} = req.body;
    console.log('Content form submited', {fname, lname, category, occupation, email, password});
    res.status(200).json({status : 'Message Received'});
});

module.exports = router;