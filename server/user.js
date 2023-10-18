const express = require('express'),
  router = express.Router();

const db = require('./database');
router.post('/login', (req, res) => {
  console.log('login');

  const sql =
    'SELECT * FROM user_accounts AS ua JOIN  user_account_roles AS uar ON ua.role_id = uar.role_id JOIN employees AS e ON e.employee_id = ua.employee_id WHERE username = ?';
  db.query(sql, [req.body.username])
    .then((result) => {
      if (result[0].length === 0) {
        return res.json({ Status: 'Fail' });
      } else {
        return res.json({ Status: 'Success', data: result[0][0] });
      }
    })
    .catch((err) => {
      return res.json({ Error: 'Error in query' });
    });
});

router.get('/getEmployees', (req, res) => {
  const sql =
    'SELECT * FROM user_accounts AS ua JOIN  user_account_roles AS uar ON ua.role_id = uar.role_id JOIN employees AS e ON e.employee_id = ua.employee_id ';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

module.exports = router;