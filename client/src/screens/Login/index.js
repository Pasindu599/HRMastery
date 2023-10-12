import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import backgroundImg from '../../assets/login_pic.png';
import { Engineering } from '@mui/icons-material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Routers, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    axios
      .post('http://localhost:8000/api/login', data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === 'Success') {
          console.log(res);
          const employee_role = res.data.data.role;
          const employee_data = res.data.data;
          console.log(employee_role);
          if (employee_role === 'Admin') {
            navigate(
              'profile/' + employee_role + '/' + employee_data.employee_id,
              {
                state: employee_data,
              }
            );
          } else if (employee_role === 'HR') {
            navigate(
              'profile/' + employee_role + '/' + employee_data.employee_id,
              {
                state: employee_data,
              }
            );
          } else if (employee_role === 'Employee') {
            navigate(
              'profile/' + employee_role + '/' + employee_data.employee_id,
              {
                state: employee_data,
              }
            );
          }
        } else {
          alert('Invalid Username or Password');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid
      component="container"
      maxWidth="lg"
      sx={{
        paddingLeft: '0px',
        paddingRight: '0px',
      }}
    >
      <Box
        height={'100vh'}
        sx={{
          padding: '0px',
        }}
      >
        <Grid
          container
          height={'100%'}
          sx={{
            padding: '0px',
          }}
        >
          <CssBaseline />
          <Grid
            fullWidth
            item
            xs={12}
            sm={12}
            md={7}
            sx={{
              backgroundImage: 'url(' + backgroundImg + ')',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#B514EE', // Average color of the background image.
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',

              fontSize: '5rem',
              color: '#fff',
            }}
          >
            <Typography
              sx={{
                alignItems: 'center',
                fontSize: '5rem',
                color: '#fff',
                display: { sm: 'none', xs: 'none', md: 'block' },
                fontWeight: 700,
                marginTop: '5%',
              }}
            >
              <Engineering
                sx={{
                  alignItems: 'baseline',
                  fontSize: '5rem',
                }}
              />
              HRMaster
            </Typography>
            <Typography
              sx={{
                marginTop: '65vh',
                fontSize: '2rem',
                display: { sm: 'none', xs: 'none', md: 'block' },
              }}
            >
              HR at your Fingertips
            </Typography>
          </Grid>
          <Grid
            fullWidth
            item
            xs={12}
            sm={12}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 700,
                  display: { sm: 'flex', xs: 'flex', md: 'none' },
                }}
              >
                HRMastery
              </Typography>

              <Typography component="h1" variant="h5">
                WELCOME MEMBER
              </Typography>
              <Typography component="h5" variant="h9">
                LOG IN TO CONTINUE
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: '#B514EE',
                    ':hover': { background: '#B514EE' },
                  }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
