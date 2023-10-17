import { useCallback, useState, useEffect } from 'react';
import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  colors,
  IconButton,
} from '@mui/material';
import './account.css';
import { ReadMore } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const defaultLableNames = [
  'employee_id',

  'gender',
  'birthdate',
  'marital_status',
  'supervisor_id',
  'department_id',
  'pay_grade_id',
  'employee_status_id',
  'job_title_id',
];

export const ProfileAdd = (props) => {
  const { role } = useParams();
  const gender = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
  ];

  const maritalStatus = [
    {
      value: 1,
      label: 'Married',
    },
    {
      value: 0,
      label: 'Unmarried',
    },
  ];

  // const accountTypes = [
  //   {
  //     value: 'Admin',
  //     label: 'Admin',
  //   },
  //   {
  //     value: 'HR',
  //     label: 'HR Manager',
  //   },
  //   {
  //     value: 'Employee',
  //     label: 'Employee',
  //   },
  // ];
  if (role === 'Admin') {
    var accountTypes = [
      {
        value: 'HR',
        label: 'HR Manager',
      },
      {
        value: 'Employee',
        label: 'Employee',
      },
    ];
  } else if (role === 'HR') {
    var accountTypes = [
      {
        value: 'Employee',
        label: 'Employee',
      },
    ];
  } else if (role === 'Employee') {
    var accountTypes = [
      {
        value: 'Employee',
        label: 'Employee',
      },
    ];
  }

  const [lableNames, setLableNames] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);

  const [allDetails, setAllDetails] = useState([]);
  const [birthday, setBirthday] = React.useState(null);
  const [values, setValues] = useState({});
  const [contactValues, setContactValues] = useState({});
  const [DepartmentValues, setDepartmentValues] = useState({});

  const [accountValues, setAccountValues] = useState({});

  useEffect(() => {
    console.log('AccountProfileDetails');
    axios
      .get('http://localhost:8000/emp/employee/details/')
      .then((response) => {
        const fieldNames = [];
        for (const item of response.data.data) {
          fieldNames.push(item.Field);
        }
        setLableNames(fieldNames);
        const newCustomAttributes = [];
        for (const item of fieldNames) {
          if (!defaultLableNames.includes(item)) {
            console.log(item);
            newCustomAttributes.push(item);
          }
        }
        setCustomAttributes(newCustomAttributes);
        console.log(customAttributes);
      })
      .catch((error) => {
        console.log(error);
      });
    //check is there any lable name not in default lable names
  }, []);

  const { editable } = props;

  const handleChange = useCallback((event) => {
    setAccountValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleChangeAccountDetails = useCallback((event) => {
    setAccountValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleChangeContactDeatils = useCallback((event) => {
    setContactValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleChangeDepartmentDeatils = useCallback((event) => {
    setDepartmentValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  return (
    <form autoComplete="off" noValidate>
      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
        }}
      >
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Profile Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker', 'DatePicker']}
                    sx={{ padding: '0px', overflow: 'visible' }}
                  >
                    <DatePicker
                      label="Birthdate"
                      value={birthday}
                      onChange={(newValue) => setBirthday(newValue)}
                      sx={{ width: '100%' }}
                      disabled={!editable}
                      className={editable ? '' : 'disabled-text-field'}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.gender}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {gender.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Marital Status"
                  name="maritalStatus"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.maritalStatus}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {maritalStatus.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton href="#">
            <ReadMore />
          </IconButton>
        </Box> */}

        {/* <Divider />

        <Divider /> */}
        <CardActions
          sx={{
            justifyContent: 'flex-end',
            display: 'none',
          }}
        >
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
      <br />
      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
        }}
      >
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Emergency Contact Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="Name"
                  name="name"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.contact_name}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship"
                  name="relationship"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.relationship}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.phoneNumber}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        {/* <Divider />

        <Divider /> */}

        <br />
        <CardActions
          sx={{
            justifyContent: 'flex-start',
            display: editable ? 'flex' : 'none',
          }}
        ></CardActions>
      </Card>
      <br />
      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
        }}
      >
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Department Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {/* <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="Department Name"
                  name="departmentName"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.name}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid> */}
              {/* {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship"
                  name="relationship"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.relationship}
                />
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Department Name"
                  name="departmentName"
                  onChange={handleChangeDepartmentDeatils}
                  required
                  value={DepartmentValues.departmentName}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* <Divider />

        <Divider /> */}
      <Box sx={{ display: customAttributes.length > 0 ? 'block' : 'none' }}>
        <br></br>
      </Box>

      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
          display: customAttributes.length > 0 ? 'block' : 'none',
        }}
      >
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Custom Attributes"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {/* <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="Department Name"
                  name="departmentName"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.name}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid> */}
              {/* {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship"
                  name="relationship"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.relationship}
                />
              </Grid> */}
              {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Department Name"
                  name="departmentName"
                  onChange={handleChangeDepartmentDeatils}
                  required
                  value={DepartmentValues.departmentName}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid> */}
              {customAttributes.map((attribute) => (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={attribute}
                    name={attribute}
                    onChange={handleChangeDepartmentDeatils}
                    required
                    value={allDetails[attribute]}
                    disabled={!editable}
                    className={editable ? '' : 'disabled-text-field'}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>

        <br />
        <CardActions
          sx={{
            justifyContent: 'flex-start',
            display: editable ? 'flex' : 'none',
          }}
        ></CardActions>
      </Card>
      <br />
      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
        }}
      >
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Account Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="User Name"
                  name="username"
                  onChange={handleChangeAccountDetails}
                  required
                  value={accountValues.username}
                  disabled={role === 'Employee' ? true : false}
                  className={'disabled-text-field'}
                />
              </Grid>
              {/* {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship"
                  name="relationship"
                  onChange={handleChangeContactDeatils}
                  required
                  value={contactValues.relationship}
                />
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  onChange={handleChangeAccountDetails}
                  required
                  value={accountValues.password}
                  disabled={role === 'Employee' ? true : false}
                  className={'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChangeAccountDetails}
                  required
                  value={accountValues.email}
                  disabled={role === 'Employee' ? true : false}
                  className={'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Type"
                  name="role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={accountValues.role}
                  disabled={role === 'Employee' ? true : false}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {accountTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        {/* <Divider />

        <Divider /> */}

        <br />
        <CardActions
          sx={{
            justifyContent: 'flex-start',
            display: editable ? 'flex' : 'none',
          }}
        ></CardActions>
      </Card>
      <br />
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#B514EE', // Set the initial background color
              ':hover': {
                backgroundColor: colors.purple[500], // Change background color on hover
              },
              ':active': {
                backgroundColor: colors.purple[700], // Change background color when active (clicked)
              },

              borderRadius: '20px',
              display: editable ? 'flex' : 'none',
            }}
          >
            Save details
          </Button>
        </Grid>
        {/* <Grid xs={12} md={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#B514EE', // Set the initial background color
              ':hover': {
                backgroundColor: colors.purple[500], // Change background color on hover
              },
              ':active': {
                backgroundColor: colors.purple[700], // Change background color when active (clicked)
              },

              borderRadius: '20px',
              display: editable ? 'none' : 'flex',
            }}
          >View Custom Fields
          </Button>
        </Grid> */}
      </Grid>
    </form>
  );
};
