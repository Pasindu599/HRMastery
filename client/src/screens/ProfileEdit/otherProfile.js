import React from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AccountProfile } from '../Profile/components/account-profile';
import { OtherAccountProfileDetails } from '../Profile/components/other-account-profile';
import Button from '@mui/material/Button';
import { colors } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OtherProfile(children) {
  const navigate = useNavigate();
  const { role, id, otherid, other } = useParams();
  console.log('role', role, 'id', id);

  const location = useLocation();
  console.log('ProfileEdit');
  console.log(location.state);

  const [edit, setEdit] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [roleEdit, setRoleEdit] = useState(true);

  const [accountTypes, setAccountTypes] = useState([
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'HR',
      label: 'HR Manager',
    },
    {
      value: 'Employee',
      label: 'Employee',
    },
  ]);

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

  // set editable to true or false
  useEffect(() => {
    if (role === 'Admin' || role === 'HR') {
      setEditButton(true);
    } else {
      setEditButton(false);
    }
  }, [role]);

  const handleEdit = () => {
    setEdit(true);
    setEditButton(false);
    console.log('role', role, 'other', other);
    if (role === other) {
      setRoleEdit(false);
    } else if (role === 'Admin') {
      setRoleEdit(true);
      setAccountTypes([
        {
          value: 'HR',
          label: 'HR Manager',
        },
        {
          value: 'Employee',
          label: 'Employee',
        },
      ]);
    } else if (role === 'HR' && other === 'Admin') {
      setRoleEdit(false);
    } else if (role === 'HR' && (other === 'Employee' || other === 'Null')) {
      setRoleEdit(true);
      setAccountTypes([
        {
          value: 'Employee',
          label: 'Employee',
        },
      ]);
    } else if (role === 'Employee') {
      setRoleEdit(false);
    }
  };

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
                  <Typography variant="h4">Account Details</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={3.5} lg={3}>
                      <AccountProfile>{location.state}</AccountProfile>
                      <br />
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: '#B514EE', // Set the initial background color

                          '&:hover': {
                            backgroundColor: '#B514EE', // Change background color on hover
                          },

                          ':active': {
                            backgroundColor: '#B514EE', // Change background color when active (clicked)
                          },

                          borderRadius: '20px',
                          display: editButton ? 'flex' : 'none',
                        }}
                        onClick={handleEdit}
                      >
                        Edit Profile Details
                      </Button>
                    </Grid>
                    <Grid xs={10} md={0.5} lg={0.5}></Grid>
                    <Grid xs={12} md={8} lg={8}>
                      <OtherAccountProfileDetails
                        editable={edit}
                      ></OtherAccountProfileDetails>
                    </Grid>
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

export default OtherProfile;
