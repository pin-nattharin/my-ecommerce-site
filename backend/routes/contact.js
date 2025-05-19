const express = require('express');
const router = express.Router();
const path = require('path');

const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, '..', 'data', 'contact.db');
const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS contact(
        id INTEGER PRIMARY KEY,
        fname TEXT,
        lname TEXT,
        email TEXT,
        subject TEXT,
        message TEXT)`);

router.post('/', (req, res) => {
    const {fname, lname, email, subject, message} = req.body;

    var sql = `INSERT INTO contact (
                fname, 
                lname, 
                email, 
                subject, 
                message) 
                VALUES ("`+fname+`", "`+lname+`", "`+email+`", "`+subject+`", "`+message+`")`;

    db.run('INSERT INTO contact (fname, lname, email, subject, message) VALUES (?, ?, ?, ?, ?)', 
        [fname, lname, email, subject, message]);

    console.log('Content form submited', {fname, lname, email, subject, message});
    res.status(200).json({status : 'Contact saved in database !!'});
});

router.get('/:action', (req, res) => {
    const { action } = req.params;

    

    switch (action) {
        case 'all' :
            var sql = "SELECT * FROM contact ORDER BY id";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({error: 'Fail to fetch contacts from DB !!!'});
                } 
                res.json(rows);
                
            });
            break;

        case 'last' :
            var sql = "SELECT * FROM contact WHERE id = (SELECT max(id) FROM contact)";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({error: 'Fail to fetch contacts from DB !!!'});
                } 
                res.json(rows);
                
            });
            break;
        default:
            return res.status(400).json({error: 'Unknow action'});
            break;
            
    }
});

module.exports = router;

