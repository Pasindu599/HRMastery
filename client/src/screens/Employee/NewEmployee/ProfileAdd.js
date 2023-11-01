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

export const ProfileAdd = (props) => {
  const { role, id } = useParams();
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
  var accountTypes = [
    {
      value: '',
      label: '',
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
  if (role === 'Admin') {
    accountTypes = [
      {
        value: '',
        label: '',
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
  } else if (role === 'HR') {
    accountTypes = [
      {
        value: '',
        label: '',
      },
      {
        value: 3,
        label: 'Employee',
      },
      {
        value: 3,
        label: 'Employee',
      },
    ];
  } else if (role === 'Employee') {
    accountTypes = [
      {
        value: '',
        label: '',
      },
      {
        value: 3,
        label: 'Employee',
      },
      {
        value: 3,
        label: 'Employee',
      },
    ];
  }

  const [lableNames, setLableNames] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);

  const [allDetails, setAllDetails] = useState([]);
  const [birthday, setBirthday] = React.useState(null);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    maritalStatus: '1',
    supervisorId: '',
    payGrade: '1',
    employeeStatusId: '1',
    jobTitleId: '1',
    departmentName: '1',
  });
  const [contactValues, setContactValues] = useState({});
  const [DepartmentValues, setDepartmentValues] = useState({});
  const [allPayGrades, setAllPayGrades] = useState([]);
  const [allEmployeeStatus, setAllEmployeeStatus] = useState([]);
  const [allJobTitles, setAllJobTitles] = useState([]);
  const [dependentValues, setDependentValues] = useState({
    dependent_name: '',
    dependent_relationship: '',
    dependent_age: '',
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
        .get(`http://localhost:8000/emp/employee/new/custom-attributes/${id}`)
        .then((response) => {
          setCustomAttributes(response.data.data);
          console.log(customAttributes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
    //check is there any lable name not in default lable names
  }, []);

  const { editable } = props;

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

  // dependent
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

  const handleChangeCustomAttribute = useCallback((event) => {
    setCustomAttributes((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(allDetails);

    const data = {
      ...accountValues,
      ...contactValues,
      ...DepartmentValues,
      ...allDetails,
      ...customAttributes,
      ...values,

      birthdate: birthday.format('YYYY-MM-DD'),
      customAttributes: customAttributes,
      ...dependentValues,
    };
    console.log(data);
    axios
      .post('http://localhost:8000/emp/employee/add', data)
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
                  defaultValue={'male'}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
        <br />

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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.departmentName}
                  disabled={!editable}
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
                    onChange={handleChangeCustomAttribute}
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
            onClick={handleSubmit}
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
