import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import backgroundImg from '../../assets/login_pic.png';
import { Engineering } from '@mui/icons-material';

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
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
