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
import { useState } from 'react';

function EditProfile() {
  const [edit, setEdit] = useState(false);
  const [editButton, setEditButton] = useState(true);

  const handleEdit = () => {
    setEdit(true);
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
                  <Typography variant="h4">Account Details</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={3.5} lg={3}>
                      <AccountProfile />
                      <br />
                      <Button
                        fullWidth
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
