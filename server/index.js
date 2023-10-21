const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = require('./database'),
  userRoutes = require('./user');
employeeRoutes = require('./employee');
branchRoutes = require('./branch');
supervisorRoutes = require('./supervisor');
hrRoutes = require('./hr');

// middleware
app.use('/api/', userRoutes);
app.use('/emp/', employeeRoutes);
app.use('/branch/', branchRoutes);
app.use('/sup/', supervisorRoutes);
app.use('/hr/', hrRoutes);

db.query('SELECT 1')
  .then(() => {
    console.log('Connected to DB');
    app.listen(8000, () => console.log('Server started on port 8000'));
  })
  .catch((err) => console.log('Error connecting to DB' + err));
