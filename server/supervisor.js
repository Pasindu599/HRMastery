const express = require('express');
const router = express.Router();

const db = require('./database');

router.get('/leave/accept/all/:id', (req, res) => {
  const emp_id = req.params.id;
  // get all employees who are under the supervisor
  const sql_1 = 'select * from employees where supervisor_id = ?';
  // find all leave_request where employee_id is in the above list

  const sql_3 = `select request_id,employee_id , reason, DATE_FORMAT(leave_start_date, '%Y-%m-%d') AS leave_start_date , leave_type, leave_day_count from leave_requests lr join leave_types l on lr.leave_type_id = l.leave_type_id  where employee_id in (?) and approved = 0`;
  // get json data from the above query_3

  db.query(sql_1, [emp_id])
    .then((result) => {
      const employee_ids = result[0].map((employee) => employee.employee_id);
      db.query(sql_3, [employee_ids])
        .then((result) => {
          return res.json(result[0]);
        })
        .catch((err) => {
          return res.json({ Status: ' false1' });
        });
    })

    .catch((err) => {
      return res.json({ Status: 'false2' });
    });
});

router.get('/leave/reject/all/:id', (req, res) => {
  const emp_id = req.params.id;
  // get all employees who are under the supervisor
  const sql_1 = 'select * from employees where supervisor_id = ?';
  // find all leave_request where employee_id is in the above list

  const sql_3 = `select request_id, employee_id , reason, DATE_FORMAT(leave_start_date, '%Y-%m-%d') AS leave_start_date , leave_type, leave_day_count from leave_requests lr join leave_types l on lr.leave_type_id = l.leave_type_id  where employee_id in (?) and approved = 2`;
  // get json data from the above query_3

  db.query(sql_1, [emp_id])
    .then((result) => {
      const employee_ids = result[0].map((employee) => employee.employee_id);
      db.query(sql_3, [employee_ids])
        .then((result) => {
          return res.json(result[0]);
        })
        .catch((err) => {
          return res.json({ Status: ' false1' });
        });
    })

    .catch((err) => {
      return res.json({ Status: 'false2' });
    });
});

router.get('/leave/approved/all/:id', (req, res) => {
  const emp_id = req.params.id;
  // get all employees who are under the supervisor
  const sql_1 = 'select * from employees where supervisor_id = ?';
  // find all leave_request where employee_id is in the above list

  const sql_3 = `select request_id,employee_id , reason, DATE_FORMAT(leave_start_date, '%Y-%m-%d') AS leave_start_date , leave_type, leave_day_count from leave_requests lr join leave_types l on lr.leave_type_id = l.leave_type_id  where employee_id in (?) and approved = 1`;
  // get json data from the above query_3

  db.query(sql_1, [emp_id])
    .then((result) => {
      const employee_ids = result[0].map((employee) => employee.employee_id);
      db.query(sql_3, [employee_ids])
        .then((result) => {
          return res.json(result[0]);
        })
        .catch((err) => {
          return res.json({ Status: ' false1' });
        });
    })

    .catch((err) => {
      return res.json({ Status: 'false2' });
    });
});

// update the accept of the leave request
router.put('/leave/accept/:leaveId', (req, res) => {
  const sql = 'update leave_requests set approved = 1 where request_id = ?';
  db.query(sql, [req.params.leaveId])
    .then((result) => {
      return res.json({ Status: true });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.put('/leave/reject/:leaveId', (req, res) => {
  const sql = 'update leave_requests set approved = 2 where request_id = ?';
  db.query(sql, [req.params.leaveId])
    .then((result) => {
      return res.json({ Status: true });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});
module.exports = router;
