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

export const AccountProfileDetails = (props) => {
  const { role, id } = useParams();
  const { editable, isLevel1 } = props;
  console.log(isLevel1);

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

  const pay_grade = [
    {
      value: 1,
      label: 'Level 1',
    },
    {
      value: 2,
      label: 'Level 2',
    },
    {
      value: 3,
      label: 'Level 3',
    },
    {
      value: 4,
      label: 'Level 4',
    },
  ];

  const employment_statuses = [
    {
      value: 1,
      label: 'Intern - full time',
    },
    {
      value: 2,
      label: 'Intern - part time',
    },
    {
      value: 3,
      label: 'Contract - full time',
    },
    {
      value: 4,
      label: 'Contract - part time',
    },
    {
      value: 5,
      label: 'Permanent',
    },
    {
      value: 6,
      label: 'Freelance',
    },
  ];

  const job_title = [
    {
      value: 1,
      label: 'HR Manager',
    },
    {
      value: 2,
      label: 'Accountant',
    },
    {
      value: 3,
      label: 'Software Engineer',
    },
    {
      value: 4,
      label: 'Project Manager',
    },
  ];

  const deparments = [
    {
      value: 1,
      label: 'Human Resource',
    },
    {
      value: 2,
      label: 'Finance and Accounting',
    },
    {
      value: 3,
      label: 'Operations',
    },
  ];

  const accountTypes = [
    {
      value: '',
      label: '',
    },
    {
      value: 1,
      label: 'Admin',
    },
    {
      value: 2,
      label: 'HR Manager',
    },
    {
      value: 3,
      label: 'Employee',
    },
  ];

  const [lableNames, setLableNames] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);

  const [allDetails, setAllDetails] = useState([]);
  const [birthday, setBirthday] = React.useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allPayGrades, setAllPayGrades] = useState([]);
  const [allEmployeeStatus, setAllEmployeeStatus] = useState([]);
  const [allJobTitles, setAllJobTitles] = useState([]);

  const [oldPassword, setOldPassword] = useState('');

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    supervisorId: '',
    payGrade: '',
    employeeStatusId: '',
    jobTitleId: '',
  });
  const [contactValues, setContactValues] = useState({
    contact_name: '',
    relationship: '',
    phoneNumber: '',
  });
  const [dependentValues, setDependentValues] = useState({
    dependent_name: '',
    dependent_relationship: '',
    dependent_age: '',
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
    async function fetchData() {
      await axios
        .get(`http://localhost:8000/emp/employee/custom-attributes/${id}`)
        .then((response) => {
          setCustomAttributes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`http://localhost:8000/emp/employee/details/${id}`)
        .then((response) => {
          // console.log(response.data.data[0], 'response.data.data[0]');
          setAllDetails(response.data.data[0]);
          setValues({
            firstName: response.data.data[0].first_name,
            lastName: response.data.data[0].last_name,
            gender: response.data.data[0].gender,
            maritalStatus: response.data.data[0].marital_status,
            supervisorId: response.data.data[0].supervisor_id,
            payGrade: response.data.data[0].pay_grade_id,
            employeeStatusId: response.data.data[0].employee_status_id,
            jobTitleId: response.data.data[0].job_title_id,
          });
          setBirthday(dayjs(response.data.data[0].birthdate));
          console.log(birthday);
          setContactValues({
            contact_name: response.data.data[0].contact_name,
            relationship: response.data.data[0].relationship,
            phoneNumber: response.data.data[0].contact_number,
          });
          setDepartmentValues({
            departmentName: response.data.data[0].department_id,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`http://localhost:8000/emp/employee/account/${id}`)
        .then((response) => {
          console.log(response.data.data[0], 'response.data.data[0]');
          setAccountValues({
            username: response.data.data[0].username,
            password: response.data.data[0].password,
            email: response.data.data[0].user_email,
            role: response.data.data[0].role_id,
          });
          setOldPassword(response.data.data[0].password);
        })
        .catch((error) => {
          console.log(error);
        });
      // get dependent details
      await axios
        .get(`http://localhost:8000/emp/employee/dependent/${id}`)
        .then((response) => {
          setDependentValues({
            dependent_name: response.data.data[0].dependent_name,
            dependent_relationship: response.data.data[0].relationship,
            dependent_age: response.data.data[0].age,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
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

  // dependent details
  const handleChangeDependentDeatils = useCallback((event) => {
    setDependentValues((prevState) => ({
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

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      ...accountValues,
      ...contactValues,
      ...DepartmentValues,

      ...customAttributes,
      ...values,

      birthdate: birthday.format('YYYY-MM-DD'),
      customAttributes: customAttributes,
      ...dependentValues,
      oldPassword: oldPassword,
    };
    console.log(data);

    axios
      .post(`http://localhost:8000/emp/employee/update/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === true) {
          console.log(res);
          alert('Employee Added Successfully');
          window.location.reload();
        } else {
          alert('Error in Adding Employee');
        }
      })
      .catch((err) => {
        console.log('mmkms');
        console.log(err);
      });
  };

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
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={isLevel1 ? true : !editable}
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
                      onChange={(newValue) => {
                        setBirthday(newValue);
                      }}
                      sx={{ width: '100%' }}
                      disabled={isLevel1 ? true : !editable}
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
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={true}
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
                  value={values.payGrade}
                  disabled={true}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {pay_grade.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  disabled={true}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {employment_statuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  disabled={true}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {job_title.map((option) => (
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
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={isLevel1 ? true : !editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <br />
        {/* dependent - details */}
        <CardHeader
          subheader={editable ? 'The information can be edited' : ''}
          title="Dependent Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  // helperText={editable ? 'Please specify the first name' : ''}
                  label="Name"
                  name="dependent_name"
                  onChange={handleChangeDependentDeatils}
                  required
                  value={dependentValues.dependent_name}
                  disabled={isLevel1 ? true : !editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Relationship"
                  name="dependent_relationship"
                  onChange={handleChangeDependentDeatils}
                  required
                  value={dependentValues.dependent_relationship}
                  disabled={isLevel1 ? true : !editable}
                  className={editable ? '' : 'disabled-text-field'}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="dependent_age"
                  onChange={handleChangeDependentDeatils}
                  required
                  value={dependentValues.dependent_age}
                  disabled={isLevel1 ? true : !editable}
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
                  disabled={true}
                  className={editable ? '' : 'disabled-text-field'}
                >
                  {deparments.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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

              {Object.keys(customAttributes).map((attribute) => (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={attribute}
                    name={attribute}
                    onChange={handleChangeCustomAttributeDeatils}
                    required
                    value={customAttributes[attribute]}
                    disabled={isLevel1 ? true : !editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  value={accountValues.role}
                  disabled={true}
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
            onClick={handleSave}
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
