const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = require('./database'),
  employeeRoutes = require('./user');

// middleware
app.use('/api/', employeeRoutes);

db.query('SELECT 1')
  .then(() => {
    console.log('Connected to DB');
    app.listen(8000, () => console.log('Server started on port 8000'));
  })
  .catch((err) => console.log('Error connecting to DB' + err));
