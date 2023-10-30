const express = require('express');
const app = express();
const cors = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // one day in ms
    },
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
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
