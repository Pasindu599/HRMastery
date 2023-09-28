import { useCallback, useState } from 'react';
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
    value: 'married',
    label: 'Married',
  },
  {
    value: 'unmarried',
    label: 'Unmarried',
  },
];

export const AccountProfileDetails = (props) => {
  const { editable } = props;
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    gender: 'male',
    maritalStatus: 'married',
  });

  const [contactValues, setContactValues] = useState({
    name: 'Anika Sharma',
    phoneNumber: '0765452827',
    relationship: 'Father',
  });

  const [DepartmentValues, setDepartmentValues] = useState({
    departmentName: 'Management',
    section: 'section1',
  });

  const [accountValues, setAccountValues] = useState({
    username: 'Pasindu599',
    password: 'pasindu',
    email: 'pasindusankalpa5999@gmail.com',
  });
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

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
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
                  value={contactValues.name}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
                  className={'disabled-text-field'}
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
        <Grid xs={12} md={4}>
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
            Add/View Custom Fields
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
