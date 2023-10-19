const express = require('express');
const router = express.Router();

const db = require('./database');

function objectToSQLUpdateString(obj) {
  const entries = Object.entries(obj);
  const sqlUpdates = entries.map(([key, value]) => {
    if (value === null) {
      return `${key} = NULL`;
    } else if (typeof value === 'string') {
      return `${key} = '${value}'`;
    } else {
      // Handle other data types as needed
      return `${key} = ${value}`;
    }
  });
  return sqlUpdates.join(',\n');
}

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

router.get('/employee/custom-attributes/:id', (req, res) => {
  const defaultLableNames = [
    'employee_id',
    'first_name',
    'last_name',
    'gender',
    'birthdate',
    'marital_status',
    'supervisor_id',
    'department_id',
    'pay_grade_id',
    'employee_status_id',
    'job_title_id',
  ];
  const emp_id = req.params.id;
  const sql = 'SELECT * FROM employees where employee_id = ?';
  db.query(sql, [emp_id])
    .then((result) => {
      // get all the keys from the result
      const keys = Object.keys(result[0][0]);
      // filter the keys
      const customAttributesVlaues = {};
      keys.forEach((key) => {
        if (!defaultLableNames.includes(key)) {
          customAttributesVlaues[key] = result[0][0][key];
        }
      });
      return res.json({ Status: true, data: customAttributesVlaues });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/new/custom-attributes/:id', (req, res) => {
  const defaultLableNames = [
    'employee_id',
    'first_name',
    'last_name',
    'gender',
    'birthdate',
    'marital_status',
    'supervisor_id',
    'department_id',
    'pay_grade_id',
    'employee_status_id',
    'job_title_id',
  ];
  const emp_id = req.params.id;
  const sql = 'SELECT * FROM employees where employee_id = ?';
  db.query(sql, [emp_id])
    .then((result) => {
      // get all the keys from the result
      const keys = Object.keys(result[0][0]);
      // filter the keys
      const customAttributesVlaues = {};
      keys.forEach((key) => {
        if (!defaultLableNames.includes(key)) {
          customAttributesVlaues[key] = '';
        }
      });
      return res.json({ Status: true, data: customAttributesVlaues });
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

router.get('/employee/profile-view/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql = 'SELECT * FROM profile_view where employee_id = ?';
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

router.post('/employee/leaving-request/:id', (req, res) => {
  const sql =
    'insert into leave_requests (`reason`, `leave_day_count`, `request_date`, `approved`, `employee_id`, `leave_type_id`) values ( ?)';

  const leaving_request = [
    req.body.reason,
    parseInt(req.body.leave_day_count),
    req.body.request_date,
    req.body.approved,
    req.params.id,
    // convert into int
    parseInt(req.body.leave_type_id),
  ];

  db.query(sql, [leaving_request])
    .then((result) => {
      return res.json({ Status: true });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

router.get('/employee/leaving-count/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql =
    'select leave_type_id , remaining_days from remaining_leaving_days r where  r.employee_id= ?';
  db.query(sql, [emp_id])
    .then((result) => {
      return res.json({ Status: true, data: result[0] });
    })
    .catch((err) => {
      return res.json({ Status: false });
    });
});

// insert new employee to the table and add to the other related tables

router.post('/employee/add/', (req, res) => {
  const sql1 =
    'CALL InsertEmployeeAndRelatedData( ?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,?, ?, ?, ?, ?,?)';

  // update the custom attributes of the employee table'
  const sql2 = 'UPDATE employees SET ? WHERE employee_id = ?';

  const employeeId = 'SELECT  GetLastEmployeeID()';

  console.log(req.body.customAttributes);

  const sqlString = objectToSQLUpdateString(req.body.customAttributes);
  console.log(sqlString);

  const employee = [
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.birthdate,
    parseInt(req.body.maritalStatus),
    req.body.supervisorId,
    parseInt(req.body.departmentName),
    parseInt(req.body.payGrade),
    parseInt(req.body.employeeStatusId),
    parseInt(req.body.jobTitleId),
    req.body.contact_name,
    req.body.relationship,
    req.body.phoneNumber,
    req.body.username,
    req.body.password,
    req.body.email,
    parseInt(req.body.role),
  ];

  console.log(employee);
  db.query(sql1, employee)
    .then((result) => {
      if (
        req.body.customAttributes === undefined ||
        req.body.customAttributes === null ||
        req.body.customAttributes.length === 0
      ) {
        return res.json({ Status: true, customAttributes: false });
      }
      db.query(employeeId).then((result) => {
        const id = result[0][0]['GetLastEmployeeID()'];
        console.log(id);
        db.query(sql2, [req.body.customAttributes, id])
          .then((result) => {
            return res.json({ Status: true });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ Status: false });
          });
      });
    })
    .catch((err) => {
      console.log('jkhkj');
      return res.json({ Status: false });
    });
});

// update the employee details
router.post('/employee/update/:id', (req, res) => {
  const emp_id = req.params.id;
  const sql1 =
    'CALL UpdateEmployeeAndRelatedData( ?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,?, ?, ?, ?, ?,?,?)';
  const sql2 = 'UPDATE employees SET ? WHERE employee_id = ?';

  const sqlString = objectToSQLUpdateString(req.body.customAttributes);
  console.log(sqlString);

  const employee = [
    emp_id,
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.birthdate,
    parseInt(req.body.maritalStatus),
    req.body.supervisorId,
    parseInt(req.body.departmentName),
    parseInt(req.body.payGrade),
    parseInt(req.body.employeeStatusId),
    parseInt(req.body.jobTitleId),
    req.body.contact_name,
    req.body.relationship,
    req.body.phoneNumber,
    req.body.username,
    req.body.password,
    req.body.email,
    parseInt(req.body.role),
  ];
  console.log(employee);
  console.log(Object.keys(req.body.customAttributes).length, 'custom');
  db.query(sql1, employee)
    .then((result) => {
      console.log('result', result);
      if (
        req.body.customAttributes === undefined ||
        req.body.customAttributes === null ||
        // get the length of the object
        Object.keys(req.body.customAttributes).length === 0
      ) {
        console.log('custom');
        return res.json({ Status: true, customAttributes: false });
      }

      db.query(sql2, [req.body.customAttributes, emp_id])
        .then((result) => {
          return res.json({ Status: true });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ Status: false });
        });
    })
    .catch((err) => {
      console.log('jkhkj');
      return res.json({ Status: false });
    });
});

module.exports = router;
