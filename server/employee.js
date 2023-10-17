const express = require('express');
const router = express.Router();

const db = require('./database');

router.get('/employee/details/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql =
    'select * from employees  e  left  join departments d on e.department_id = d.department_id left join pay_grades p on e.pay_grade_id = p.pay_grade_id left join employment_statuses es on  e.employee_status_id = es.employee_status_id left join job_titles j  on e.job_title_id = j.job_title_id left join emergency_contact_details em on e.employee_id = em.employee_id where e.employee_id = ?';
  db.query(sql, [emp_id])
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/details/', (req, res) => {
  const sql = 'SHOW COLUMNS FROM hrm.employees';
  db.query(sql)
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/account/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql =
    'SELECT * FROM user_accounts AS ua LEFT JOIN  user_account_roles AS uar ON ua.role_id = uar.role_id WHERE ua.employee_id = ?';
  db.query(sql, [emp_id])
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/dependents/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql = 'SELECT * FROM dependents where employee_id = ?';
  db.query(sql, [emp_id])
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/table/', (req, res) => {
  const sql =
    'select e.employee_id, e.first_name, e.last_name , ua.user_email, ecd.contact_number, uar.role from employees as e left join emergency_contact_details as ecd  on e.employee_id = ecd.employee_id left join user_accounts as ua on ua.employee_id = e.employee_id left join user_account_roles as uar on uar.role_id = ua.role_id';

  db.query(sql)
    .then((result) => {
      return res.json(result[0]);
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

module.exports = router;
