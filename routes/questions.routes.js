const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/questions').get((req, res) => {
  res.json(db.questions);
});

router.route('/questions/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random()*db.questions.length);
  res.json(db.questions[randomIndex]);
});

module.exports = router;
