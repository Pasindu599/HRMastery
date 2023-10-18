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

function EditProfile(children) {
  const navigate = useNavigate();
  const { role, id } = useParams();
  console.log('role', role, 'id', id);

  const location = useLocation();
  console.log('ProfileEdit');
  console.log(location.state);

  const [edit, setEdit] = useState(false);
  const [editButton, setEditButton] = useState(false);
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
                      <AccountProfileDetails
                        editable={edit}
                        accountTypes={accountTypes}
                      ></AccountProfileDetails>
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

export default EditProfile;