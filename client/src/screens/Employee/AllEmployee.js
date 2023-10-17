import React, { useEffect } from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Tab } from '@mui/material';
import Table from '../../components/Table/Table';
import { useNavigate, useParams } from 'react-router-dom';

function AllEmployee() {
  const navigate = useNavigate();
  const { role, id } = useParams();
  return (
    <div>
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
                  <Typography variant="h4">All Employees</Typography>
                </box>
                <br />
                <div>
                  <Grid container>
                    <Table role_type={role} user_id={id} />
                  </Grid>
                </div>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AllEmployee;
