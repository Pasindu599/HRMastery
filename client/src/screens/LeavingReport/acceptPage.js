import React, { useEffect } from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DayCountToAccept } from './components/DayCountToAccept';
import { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { colors } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const leave_type = [
  {
    value: 1,
    label: 'Annual',
  },
  {
    value: 2,
    label: 'Casual',
  },
  {
    value: 3,
    label: 'Maternity',
  },
  {
    value: 4,
    label: 'No Pay',
  },
];

function AcceptPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, role } = useParams();
  const otherid = location.state.request_id;
  const [leave_start_date, setLeaveStartDate] = React.useState(null);
  const [request_date, setRequestDate] = React.useState(null);
  const [values, setValues] = useState({
    reason: '',
    leave_day_count: '',
    approved: 0,
    employee_id: otherid,
    leave_type_id: '',
    employee_name: '',
    request_id: '',
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/')
      .then((res) => {
        if (
          res.data.valid === true &&
          res.data.role === role &&
          res.data.employee_id === id
        ) {
          setUser({
            username: res.data.username,
          });
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/emp/employee-sup/leaving-request/to-accept/${otherid}`
      )
      .then((res) => {
        console.log(res.data.data[0]);
        setValues({
          reason: res.data.data[0].reason,
          leave_day_count: res.data.data[0].leave_day_count,
          approved: res.data.data[0].approved,
          employee_id: res.data.data[0].employee_id,
          leave_type_id: res.data.data[0].leave_type_id,
          employee_name:
            res.data.data[0].first_name + ' ' + res.data.data[0].last_name,
          request_id: otherid,
        });
        setLeaveStartDate(dayjs(res.data.data[0].leave_start_date));
        setRequestDate(dayjs(res.data.data[0].request_date));
      });
  }, []);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleChangeAccept = async (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8000/sup/leave/accept/' + values.request_id)
      .then((res) => {
        console.log('Leave accepted');
        alert('Leave accepted');
        navigate('/leave-accept/' + role + '/' + id);
      })
      .catch((err) => {
        alert('Error in accepting leave');
        console.log(err);
      });
  };

  const handleChangeReject = async (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8000/sup/leave/reject/' + values.request_id)
      .then((res) => {
        console.log('Leave rejected');
        alert('Leave rejected');
        navigate('/leave-accept/' + role + '/' + id);
      })
      .catch((err) => {
        alert('Error in rejecting leave');
        console.log(err);
      });
  };
  return (
    <>
      <Home />
      <Box sx={{ display: 'flex' }}>
        <SideDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: '#F8E5FF' }}
        >
          {/* <DrawerHeader /> */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Stack spacing={4}>
                <box>
                  <Typography variant="h4">Request Leaving</Typography>
                </box>
                <br />

                <Grid
                  container
                  gap={3}
                  sx={{
                    justifyContent: 'center',
                  }}
                >
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCountToAccept
                      leavingType="annualDays"
                      type="Annual Leaving Days"
                    ></DayCountToAccept>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCountToAccept
                      leavingType="casualDays"
                      type="Casual Leaving Days"
                    ></DayCountToAccept>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCountToAccept
                      leavingType="maternityDays"
                      type="Maternity Leaving Days"
                    ></DayCountToAccept>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCountToAccept
                      leavingType="noPayDays"
                      type="No Pay Leaving Days"
                    ></DayCountToAccept>
                  </Grid>
                </Grid>
                <Grid xs={12} md={12} lg={12}>
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
                        //   subheader={
                        //     editable ? 'The information can be edited' : ''
                        //   }
                        title="Leaving Information"
                      />
                      <br />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid container rowGap={2} columnGap={3}>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Request ID"
                                name="request_id"
                                required
                                value={values.request_id}
                                disabled={true}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>
                            <Grid xs={12} md={6}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={['DatePicker', 'DatePicker']}
                                  sx={{ padding: '0px', overflow: 'visible' }}
                                >
                                  <DatePicker
                                    label="Request Date"
                                    value={request_date}
                                    sx={{ width: '100%' }}
                                    disabled={true}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="EmployeeID"
                                name="employee_id"
                                required
                                value={values.employee_id}
                                disabled={true}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                label="Employee Name"
                                name="employee_name"
                                required
                                value={values.employee_name}
                                disabled={true}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>

                            <Grid xs={12} md={12} lg={12}>
                              <FormLabel
                                sx={{
                                  paddingLeft: '10px',
                                  paddingBottom: '0px',
                                  color: '#600182',
                                  fontSize: '20px',
                                  margin: '0px',
                                }}
                              >
                                Reason
                              </FormLabel>
                              <Textarea
                                label="Reason"
                                name="reason"
                                multiline
                                placeholder="Write your reason here"
                                minRows={2}
                                sx={{
                                  marginTop: '10px',
                                }}
                                value={values.reason}
                                disabled={true}
                              />
                            </Grid>

                            <Grid xs={12} md={6}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={['DatePicker', 'DatePicker']}
                                  sx={{ padding: '0px', overflow: 'visible' }}
                                >
                                  <DatePicker
                                    label="Request Date"
                                    value={leave_start_date}
                                    sx={{ width: '100%' }}
                                    disabled={true}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} md={3}>
                              <TextField
                                fullWidth
                                label="Number of Days"
                                name="leave_day_count"
                                value={values.leave_day_count}
                                disabled={true}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Leaving Type"
                                name="leave_type_id"
                                required
                                value={values.leave_type_id}
                                disabled={true}
                                select
                                SelectProps={{ native: true }}
                              >
                                {leave_type.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </form>
                </Grid>
                <Grid xs={12} md={8}>
                  <Button
                    variant="contained"
                    onClick={handleChangeAccept}
                    sx={{
                      marginLeft: '20px',
                      backgroundColor: '#B514EE', // Set the initial background color
                      ':hover': {
                        backgroundColor: colors.purple[500], // Change background color on hover
                      },
                      ':active': {
                        backgroundColor: colors.purple[700], // Change background color when active (clicked)
                      },

                      borderRadius: '20px',
                      //   display: editable ? 'flex' : 'none',
                    }}
                  >
                    Accept
                  </Button>

                  {/* get space between buttons */}

                  <Button
                    variant="contained"
                    onClick={handleChangeReject}
                    sx={{
                      marginLeft: '20px',
                      backgroundColor: '#B514EE', // Set the initial background color
                      ':hover': {
                        backgroundColor: colors.purple[500], // Change background color on hover
                      },
                      ':active': {
                        backgroundColor: colors.purple[700], // Change background color when active (clicked)
                      },

                      borderRadius: '20px',
                      //   display: editable ? 'flex' : 'none',
                    }}
                  >
                    Reject
                  </Button>
                </Grid>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AcceptPage;
