import React from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DayCount } from './components/DayCount';
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LeavesTable from '../../components/Table/PendingLeaves';
import { pendingLeaves, approvedLeaves, rejectedLeaves } from './axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

function LeavingRequest() {
  const navigate = useNavigate();
  const { role, id } = useParams();
  const [requestDate, setRequestDate] = React.useState(null);
  const [values, setValues] = useState({
    reason: '',
    leave_day_count: '',
    approved: 0,
    employee_id: id,
    leave_type_id: '',
  });
  axios.defaults.withCredentials = true;
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
    window.scrollTo(0, 0);
  }, []);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      reason: values.reason,
      leave_day_count: values.leave_day_count,
      approved: values.approved,
      employee_id: values.employee_id,
      leave_type_id: values.leave_type_id,
      request_date: requestDate,
    };

    if (
      data.reason === null ||
      data.reason === undefined ||
      data.reason === ''
    ) {
      alert('Please select reason');
      return;
    }

    if (
      data.leave_day_count === null ||
      data.leave_day_count === undefined ||
      data.leave_day_count === ''
    ) {
      alert('Please select leave day count');
      return;
    }

    if (
      data.leave_type_id === null ||
      data.leave_type_id === undefined ||
      data.leave_type_id === ''
    ) {
      alert('Please select leave type');
      return;
    }

    if (
      data.request_date === null ||
      data.request_date === undefined ||
      data.request_date === ''
    ) {
      alert('Please select request date');
      return;
    }

    await axios
      .post(`http://localhost:8000/emp/employee/leaving-request/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === true) {
          alert('Request Sent');
          // page refresh
          window.location.reload();
        } else {
          alert('Request Failed');
        }
      })

      .catch((err) => {
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
                    <DayCount
                      leavingType="annualDays"
                      type="Annual Leaving Days"
                    ></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount
                      leavingType="casualDays"
                      type="Casual Leaving Days"
                    ></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount
                      leavingType="maternityDays"
                      type="Maternity Leaving Days"
                    ></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount
                      leavingType="noPayDays"
                      type="No Pay Leaving Days"
                    ></DayCount>
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
                                onChange={handleChange}
                                // value={values.reason}
                                required
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
                                    value={requestDate}
                                    onChange={(newValue) => {
                                      setRequestDate(
                                        newValue.format('YYYY-MM-DD')
                                      );
                                    }}
                                    sx={{ width: '100%' }}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} md={3}>
                              <TextField
                                fullWidth
                                label="Number of Days"
                                name="leave_day_count"
                                onChange={handleChange}
                                value={values.leave_day_count}
                                required
                                //   value={values.lastName}
                                //   disabled={!editable}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Leaving Type"
                                name="leave_type_id"
                                required
                                select
                                SelectProps={{ native: true }}
                                onChange={handleChange}
                                // value={'Annual'}
                                //   disabled={!editable}
                                //   className={editable ? '' : 'disabled-text-field'}
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
                    onClick={handleSubmit}
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
                    Request
                  </Button>
                </Grid>
                <box>
                  <Typography variant="h4">Pending Leaves</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <LeavesTable link={pendingLeaves} />
                  </Grid>
                </div>
                <box>
                  <Typography variant="h4">Approved Leaves</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <LeavesTable link={approvedLeaves} />
                  </Grid>
                </div>
                <box>
                  <Typography variant="h4">Rejected Leaves</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <LeavesTable link={rejectedLeaves} />
                  </Grid>
                </div>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LeavingRequest;
