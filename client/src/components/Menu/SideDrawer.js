import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { createTheme } from '@mui/material/styles';
import { purple, lime } from '@mui/material/colors';
import { makeStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: purple,
  },
});

export default function SideDrawer(props) {
  const { role, id } = useParams();
  const navigate = useNavigate();

  const [drawerBackground, setDrawerBackground] = React.useState('#B514EE'); // Initialize background color

  const [openList, setOpenList] = React.useState(false);
  const [allEmployeeView, setAllEmployeeView] = React.useState(false);
  const [approveLeaveView, setApproveLeaveView] = React.useState(false);
  const [reportView, setReportView] = React.useState(false);
  const [customAttributeView, setCustomAttributeView] = React.useState(false);
  // const [settingsView, setSettingsView] = React.useState(false);
  // const [logoutView, setLogoutView] = React.useState(false);
  const [acceptLeaveView, setAcceptLeaveView] = React.useState(false);

  // const handleBackgroundChange = () => {
  //   // Change the background color when the button is clicked
  //   setDrawerBackground('#343A40');
  // };
  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/emp/employee/details/pay_grade/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.isSupervisor === true) {
          setApproveLeaveView(true);
        } else if (res.data.isSupervisor === false) {
          setAcceptLeaveView(true);
        }

        if (role === 'Admin') {
          setAllEmployeeView(true);
          setReportView(true);
          setCustomAttributeView(true);
        } else if (role === 'HR') {
          setAllEmployeeView(true);
          setReportView(true);
          setCustomAttributeView(true);
        } else if (role === 'Employee' && res.data.level1 === false) {
          setAllEmployeeView(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    setOpenList(!openList);
  };

  const handeleRequestLeave = () => {
    navigate('/leaving-request/' + role + '/' + id + '/', { replace: true });
  };

  const theme = useTheme();
  const openDrawer = true;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box height={30} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#B514EE',
            },
          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader></DrawerHeader>
          <Divider />
          <List>
            <ListItem sx={{ padding: '2' }}>
              <ListItemButton
                component="a"
                sx={{
                  // backgroundColor: drawerBackground,
                  color: 'inherit',
                  borderRadius: '20px',

                  backgroundColor: drawerBackground,
                }}
                onClick={() => {
                  navigate('/profile/' + role + '/' + id + '/', {
                    replace: true,
                  });
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4, color: 'inherit' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="User Profile" sx={{ marginRight: 4 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem sx={{ padding: '2' }}>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Employees Details"
                  sx={{ marginRight: 4 }}
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 10,
                    color: 'inherit',
                    borderRadius: '20px',

                    backgroundColor: drawerBackground,
                  }}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton sx={{ pl: 10 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="HR Manager" />
                </ListItemButton>
              </List>
            </Collapse> */}
            <ListItem
              sx={{ padding: '2', display: allEmployeeView ? 'block' : 'none' }}
            >
              <ListItemButton
                component="a"
                onClick={() => {
                  // go and refresh the page
                  navigate('/all-employee/' + role + '/' + id + '/', {
                    replace: true,
                  });
                }}
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',
                  display: allEmployeeView ? 'flex' : 'none',
                  backgroundColor: drawerBackground,
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="All Employees"
                  sx={{
                    marginRight: 4,
                    color: 'inherit',
                    display: allEmployeeView ? 'flex' : 'none',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: '2' }}>
              <ListItemButton
                component="a"
                onClick={handeleRequestLeave}
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',

                  backgroundColor: drawerBackground,
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Request Leave"
                  sx={{ marginRight: 4, color: 'inherit' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                padding: '2',
                display: approveLeaveView ? 'block' : 'none',
              }}
            >
              <ListItemButton
                component="a"
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',
                  backgroundColor: drawerBackground,
                  display: approveLeaveView ? 'flex' : 'none',
                }}
                onClick={() => {
                  navigate('/leave-accept/' + role + '/' + id + '/', {
                    replace: true,
                  });
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Approve Leaves"
                  sx={{
                    marginRight: 4,
                    color: 'inherit',
                    display: approveLeaveView ? 'flex' : 'none',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{ padding: '2', display: reportView ? 'block' : 'none' }}
            >
              <ListItemButton
                component="a"
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',
                  display: reportView ? 'flex' : 'none',
                  backgroundColor: drawerBackground,
                }}
              >
                <ListItemIcon
                  sx={{ marginLeft: 4, display: reportView ? 'flex' : 'none' }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Report"
                  sx={{
                    marginRight: 4,
                    color: 'inherit',
                    display: reportView ? 'flex' : 'none',
                  }}
                  onClick={() => {
                    navigate('/report/' + role + '/' + id + '/', {
                      replace: true,
                    });
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                padding: '2',
                display: customAttributeView ? 'block' : 'none',
              }}
            >
              <ListItemButton
                component="a"
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',

                  backgroundColor: drawerBackground,
                  display: customAttributeView ? 'flex' : 'none',
                }}
                onClick={() => {
                  navigate('/custom-attributes/' + role + '/' + id + '/', {
                    replace: true,
                  });
                }}
              >
                <ListItemIcon
                  sx={{
                    marginLeft: 4,
                    display: customAttributeView ? 'flex' : 'none',
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Custom Attributes"
                  sx={{
                    marginRight: 4,
                    color: 'inherit',
                    display: customAttributeView ? 'block' : 'none',
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* <ListItem sx={{ padding: '2' }}>
              <ListItemButton
                component="a"
                href="#Report"
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',

                  backgroundColor: drawerBackground,
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={{ marginRight: 4, color: 'inherit' }}
                />
              </ListItemButton>
            </ListItem> */}
          </List>
          <Divider></Divider>
          <List>
            <ListItem sx={{ padding: '2' }}>
              <ListItemButton
                component="a"
                sx={{
                  color: 'inherit',
                  borderRadius: '20px',

                  backgroundColor: drawerBackground,
                }}
              >
                <ListItemIcon sx={{ marginLeft: 4 }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Log Out"
                  sx={{ marginRight: 4, color: 'inherit' }}
                  onClick={() => {
                    axios
                      .post('http://localhost:8000/api/logout')
                      .then((res) => {
                        console.log(res);
                        if (res.data.Status === 'Success') {
                          console.log(res);
                          navigate('/', { replace: true });
                        }
                      });
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
