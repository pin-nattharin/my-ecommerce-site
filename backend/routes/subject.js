const express = require('express');
const Router = express.Router();

//const subject = '{"contactSubject": ["General Enquery","Classes","Schedules","Instructor","Prices","Other","Nattharin","Pin"]}';
const subject = require('../data/contact_subject.json');

Router.get('/', (req, res) => {
  //res.end(subject); // string (text)
  res.json(subject); // file
});

module.exports = Router;

