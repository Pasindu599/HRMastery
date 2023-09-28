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

const gender = [
  {
    value: 'annual',
    label: 'Annual',
  },
  {
    value: 'casual',
    label: 'Casual',
  },
  {
    value: 'maternity',
    label: 'Maternity',
  },
  {
    value: 'noPay',
    label: 'No Pay',
  },
];

function LeavingRequest() {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    gender: 'male',
    maritalStatus: 'married',
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);
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
                    <DayCount leavingType="annualDays"></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount leavingType="casualDays"></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount leavingType="maternityDays"></DayCount>
                  </Grid>
                  <Grid xs={12} md={2.5} lg={2.5}>
                    <DayCount leavingType="noPayDays"></DayCount>
                  </Grid>
                </Grid>
                <Grid xs={12} md={12} lg={12}>
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
                                  color: '#600182',
                                  fontSize: '20px',
                                }}
                              >
                                Reason
                              </FormLabel>
                              <Textarea
                                placeholder="Write your reason here"
                                minRows={2}
                                sx={{
                                  marginTop: '10px',
                                }}
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
                                    //   value={value}
                                    //   onChange={(newValue) => setValue(newValue)}
                                    sx={{ width: '100%' }}
                                    //   disabled={!editable}
                                    //   className={editable ? '' : 'disabled-text-field'}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} md={3}>
                              <TextField
                                fullWidth
                                label="Number of Days"
                                name="dayCount"
                                //   onChange={handleChange}
                                //   required
                                //   value={values.lastName}
                                //   disabled={!editable}
                                //   className={editable ? '' : 'disabled-text-field'}
                              />
                            </Grid>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Leaving Type"
                                name="leavingType"
                                //   onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                //   value={values.gender}
                                //   disabled={!editable}
                                //   className={editable ? '' : 'disabled-text-field'}
                              >
                                {gender.map((option) => (
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
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LeavingRequest;
