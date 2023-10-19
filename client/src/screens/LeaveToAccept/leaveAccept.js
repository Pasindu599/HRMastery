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
import { Tab } from '@mui/material';
import Table from '../../components/Table/LeavesToAccept';

function LeaveAccept(children) {
  const navigate = useNavigate();
  const { role, id } = useParams();
  console.log('role', role, 'id', id);

  // set editable to true or false

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
                  <Typography variant="h4">Accept Leaves</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <Table />
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

export default LeaveAccept;
