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
import { emp_dep, emp_paygrade } from './components/axios';

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
        <SideDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: '#F8E5FF' }}
        >
          <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
                Reports Dashboard
              </Typography>

              <Grid container spacing={4}>
                {/* Employee by Department Section */}
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
                      Employee by Department
                    </Typography>
                    <Grid container spacing={3}>
                      <Emp_Department link={emp_dep} />
                    </Grid>
                  </Card>
                </Grid>

                {/* Total Leaves Section */}
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
                      Total Leaves by Department
                    </Typography>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ textAlign: 'center' }}>
                          Total Leaves: {totalLeaves || 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: '#B514EE',
                            '&:hover': {
                              backgroundColor: '#9610CC',
                            },
                            borderRadius: '8px',
                            py: 1.5,
                          }}
                          onClick={() => {
                            axios
                              .get(
                                'http://localhost:8000/emp/report/total_leaves/' +
                                  DepartmentValues.departmentName
                              )
                              .then((res) => {
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
                  </Card>
                </Grid>

                {/* Employee by Pay Grade Section */}
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
                      Employee by Pay Grade
                    </Typography>
                    <Grid container spacing={3}>
                      <Emp_PayGrade link={emp_paygrade} />
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
