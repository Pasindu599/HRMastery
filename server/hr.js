const express = require('express');
const router = express.Router();

const db = require('./database');

//request to add a new column to the employee table
router.post('/addNewColumn', (req, res) => {
  const column_name = req.body.column_name;
  const column_type = req.body.column_type;
  const sql = `ALTER TABLE employees ADD ${column_name} ${column_type}`;
  db.query(sql)
    .then((result) => {
      return res.json({ Status: 'Success' });
    })
    .catch((err) => {
      return res.json({ Status: 'Fail' });
    });
});

module.exports = router;
