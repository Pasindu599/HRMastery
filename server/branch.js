const express = require('express');
const router = express.Router();

const db = require('./database');

router.get('/deparments/', (req, res) => {
  const sql = 'SELECT * FROM departments';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/pay-grades/', (req, res) => {
  const sql = 'SELECT * FROM pay_grades';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee-status/', (req, res) => {
  const sql = 'SELECT * FROM employment_statuses;';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/job-titles/', (req, res) => {
  const sql = 'SELECT * FROM job_titles;';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

module.exports = router;
