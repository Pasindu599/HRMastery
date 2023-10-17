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

export const OtherAccountProfileDetails = (props) => {
  const { role, id, otherid, other } = useParams();
  const { editable, accountTypes, roleEdit } = props;
  console.log('OtherAccountProfileDetails');
  console.log(role, id, otherid, other);
  const [lableNames, setLableNames] = useState([]);
  const [customAttributes, setCustomAttributes] = useState({});

  const [allDetails, setAllDetails] = useState([]);
  const [birthday, setBirthday] = React.useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allPayGrades, setAllPayGrades] = useState([]);
  const [allEmployeeStatus, setAllEmployeeStatus] = useState([]);
  const [allJobTitles, setAllJobTitles] = useState([]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    supervisorId: '',
    payGradeId: '',
    employeeStatusId: '',
    jobTitleId: '',
  });
  const [contactValues, setContactValues] = useState({
    contact_name: '',
    relationship: '',
    phoneNumber: '',
  });
  const [DepartmentValues, setDepartmentValues] = useState({
    departmentName: '',
  });

  const [accountValues, setAccountValues] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });

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
        console.log(fieldNames);
        // const customAttributeValues = {};
        // for (const item of fieldNames) {
        //   if (!defaultLableNames.includes(item)) {
        //     console.log('item');
        //     console.log(item);
        //     customAttributeValues[item] = '';
        //   }
        // }

        // setCustomAttributes(customAttributeValues);
        // console.log('customAttributeValues');
        // console.log(customAttributeValues);
      })

      .catch((error) => {
        console.log(error);
      });
    //check is there any lable name not in default lable names

    axios
      .get(`http://localhost:8000/emp/employee/details/${otherid}`)
      .then((response) => {
        console.log(response.data.data[0]);
        setAllDetails(response.data.data[0]);
        setValues({
          firstName: response.data.data[0].first_name,
          lastName: response.data.data[0].last_name,
          gender: response.data.data[0].gender,
          maritalStatus: response.data.data[0].marital_status,
          supervisorId: response.data.data[0].supervisor_id,
          payGradeId: response.data.data[0].pay_grade_id,
          employeeStatusId: response.data.data[0].employee_status_id,
          jobTitleId: response.data.data[0].job_title_id,
        });
        setBirthday(dayjs(response.data.data[0].birthdate));
        setContactValues({
          contact_name: response.data.data[0].contact_name,
          relationship: response.data.data[0].relationship,
          phoneNumber: response.data.data[0].contact_number,
        });
        setDepartmentValues({
          departmentName: response.data.data[0].name,
        });
        // setAccountValues({
        //   username: response.data.data[0].username,
        //   password: response.data.data[0].password,
        //   email: response.data.data[0].email,
        //   role: response.data.data[0].role,
        // });
        const customAttributeValues = {};
        for (const item of lableNames) {
          if (!defaultLableNames.includes(item)) {
            console.log('item');
            console.log(item);
            customAttributeValues[item] = response.data.data[0][item];
          }
        }

        setCustomAttributes(customAttributeValues);
        console.log('customAttribute');
        console.log(customAttributes);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:8000/emp/employee/account/${otherid}`)
      .then((response) => {
        console.log(response.data.data[0]);
        setAccountValues({
          username: response.data.data[0].username,
          password: response.data.data[0].password,
          email: response.data.data[0].user_email,
          role: response.data.data[0].role,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:8000/branch/deparments/').then((response) => {
      console.log(response.data.data);
      setAllDepartments(response.data.data);
    });

    axios.get('http://localhost:8000/branch/pay-grades/').then((response) => {
      console.log(response.data.data);
      setAllPayGrades(response.data.data);
    });

    axios
      .get('http://localhost:8000/branch/employee-status/')
      .then((response) => {
        console.log(response.data.data);
        setAllEmployeeStatus(response.data.data);
      });

    axios.get('http://localhost:8000/branch/job-titles/').then((response) => {
      console.log(response.data.data);
      setAllJobTitles(response.data.data);
      if (role === 'Employee' || role === 'HR') {
        setAllJobTitles(
          response.data.data.filter(
            (item) =>
              item.job_title === 'HR Manager' || item.job_title === 'Admin'
          )
        );
      }
    });
  }, []);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
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

  const handleChangeCustomAttributeDeatils = useCallback((event) => {
    setCustomAttributes((prevState) => ({
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
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Supervisor ID"
                  name="supervisorId"
                  onChange={handleChange}
                  required
                  value={values.supervisorId}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pay Grade"
                  name="payGrade"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.payGradeId}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {allPayGrades.map((option) => (
                    <option
                      key={option.pay_grade_id}
                      value={option.pay_grade_id}
                    >
                      {option.pay_grade}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Employee Status"
                  name="employeeStatusId"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.employeeStatusId}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {allEmployeeStatus.map((option) => (
                    <option
                      key={option.employee_status_id}
                      value={option.employee_status_id}
                    >
                      {option.status}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitleId"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.jobTitleId}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {allJobTitles.map((option) => (
                    <option
                      key={option.job_title_id}
                      value={option.job_title_id}
                    >
                      {option.job_title}
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
                  select
                  SelectProps={{ native: true }}
                  value={DepartmentValues.departmentName}
                  disabled={!editable}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {allDepartments.map((option) => (
                    <option
                      key={option.deparment_id}
                      value={option.department_id}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* <Divider />

        <Divider /> */}
      <Box
        sx={{
          display: Object.keys(customAttributes).length > 0 ? 'block' : 'none',
        }}
      >
        <br></br>
      </Box>

      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
          display: Object.keys(customAttributes).length > 0 ? 'block' : 'none',
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
              {/* {customAttributes.map((attribute) => (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={attribute}
                    name={attribute}
                    onChange={handleChangeCustomAttributeDeatils}
                    required
                    value=""
                    disabled={!editable}
                    className={editable ? '' : 'disabled-text-field'}
                  />
                </Grid>


              ))} */}

              {Object.keys(customAttributes).map((attribute) => (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={attribute}
                    name={attribute}
                    onChange={handleChangeCustomAttributeDeatils}
                    required
                    value={customAttributes[attribute]}
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
                  disabled={
                    other === 'Null' && (role === 'HR' || role === 'Admin')
                      ? false
                      : true
                  }
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
                  disabled={
                    other === 'Null' && (role === 'HR' || role === 'Admin')
                      ? false
                      : true
                  }
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
                  disabled={
                    other === 'Null' && (role === 'HR' || role === 'Admin')
                      ? false
                      : true
                  }
                  className={'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Type"
                  name="role"
                  onChange={handleChangeAccountDetails}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={accountValues.role ? accountValues.role : 'Employee'}
                  disabled={!roleEdit && !editable ? true : false}
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
