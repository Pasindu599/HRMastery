import React from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AccountProfile } from '../Profile/components/account-profile';
import { AccountProfileDetails } from '../Profile/components/account-profile-details';
import Button from '@mui/material/Button';
import { colors } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Emp_Department from './components/emp_dep';
import Emp_PayGrade from './components/emp_paygrade';
import { Tab } from '@mui/material';
import { useCallback } from 'react';
import { TextField } from '@mui/material';
import {
  emp_dep,
  approvedLeaves,
  rejectedLeaves,
  emp_paygrade,
} from './components/axios';

function EditProfile(children) {
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
  const navigate = useNavigate();
  const { role, id } = useParams();
  console.log('role', role, 'id', id);
  const [DepartmentValues, setDepartmentValues] = useState({
    departmentName: 1,
  });
  const [totalLeaves, setTotalLeaves] = useState();

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

  const handleChangeDepartmentDeatils = useCallback((event) => {
    setDepartmentValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  console.log('ProfileEdit');

  return (
    <>
      <Home />
      <Box sx={{ display: 'flex' }}>
        <SideDrawer></SideDrawer>
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
                  <Typography variant="h4">Report</Typography>
                </box>
                <br />
                <div>
                  <box>
                    <Typography variant="h4">
                      {' '}
                      Employee by department
                    </Typography>
                  </box>
                  <br />
                  <Grid container spacing={3}>
                    <Emp_Department link={emp_dep} />
                  </Grid>
                  <br />
                  <box>
                    <Typography variant="h4">
                      {' '}
                      Total leaves in given period by department
                    </Typography>
                  </box>
                  <Grid
                    display={'flex'}
                    sx={{
                      margin: '20px',
                      //   justifyContent: 'space-between',
                    }}
                  >
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
                      >
                        {deparments.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Typography variant="h4" marginLeft={10}>
                        {totalLeaves}
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        marginLeft: '10px',
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#B514EE', // Set the initial background color
                          ':hover': {
                            backgroundColor: '#B514EE',
                            outlineColor: '#B514EE', // Change background color on hover
                          },
                          ':active': {
                            backgroundColor: colors.purple[700], // Change background color when active (clicked)
                          },

                          borderRadius: '20px',
                          marginLeft: '20px',
                        }}
                        onClick={() => {
                          axios
                            .get(
                              'http://localhost:8000/emp/report/total_leaves/' +
                                DepartmentValues.departmentName
                            )
                            .then((res) => {
                              console.log(res.data);
                              setTotalLeaves(res.data[0].result);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                  <box>
                    <Typography variant="h4">
                      {' '}
                      Employee by department
                    </Typography>
                  </box>
                  <br />
                  <Grid container spacing={3}>
                    <Emp_PayGrade link={emp_paygrade} />
                  </Grid>
                  <br />
                  <box></box>
                </div>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
