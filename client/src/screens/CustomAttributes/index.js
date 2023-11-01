import React, { useEffect } from 'react';
import Home from '../../components/Header/index';
import SideDrawer from '../../components/Menu/SideDrawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider, Tab } from '@mui/material';
import Table from '../../components/Table/Table';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
} from '@mui/material';
import { Button } from '@mui/material';
import { colors } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const customAttributesType = [
  {
    value: 'INT',
    label: 'INT',
  },
  {
    value: 'VARCHAR(100)',
    label: 'VARCHAR(100)',
  },
  {
    value: 'VARCHAR(50)',
    label: 'VARCHAR(50)',
  },
  {
    value: 'CHAR(5)',
    label: 'CHAR(5)',
  },
  {
    value: 'FLOAT',
    label: 'FLOAT',
  },
];

function CustomAttributes() {
  const navigate = useNavigate();
  const { role, id } = useParams();
  const [editable, setEditable] = React.useState(false);
  const [values, setValues] = React.useState({
    customAttributeName: '',
    customAttributeType: 'INT',
  });
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
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = (event) => {
    const data = {
      column_name: values.customAttributeName,
      column_type: values.customAttributeType,
    };

    axios
      .post('http://localhost:8000/hr/addNewColumn', data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === 'Success') {
          console.log(res);
          alert('Successfully Added');
          navigate('/profile/' + role + '/' + id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <Typography variant="h4">Add Custom Attributes</Typography>
                </box>
                <br />
                <div>
                  <Grid container spacing={3}>
                    <Card
                      sx={{
                        backgroundColor: '#F8E5FF',
                        borderRadius: '50px',
                        border: '1px solid rgba(73, 2, 106, 0.60)',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        paddingLeft: '50px',
                        width: '100%',
                        paddingRight: '50px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                      }}
                    >
                      <CardHeader
                        subheader={
                          editable ? 'The information can be edited' : ''
                        }
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid container spacing={3}>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                // helperText={editable ? 'Please specify the first name' : ''}
                                label="Custom Attribute Name"
                                name="customAttributeName"
                                onChange={handleChange}
                                required
                                value={values.customAttributeName}
                              />
                            </Grid>
                            <Box sx={{ m: 3 }} />

                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                label="customAttributeType"
                                name="customAttributeType"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.customAttributeType}
                                className={
                                  editable ? '' : 'disabled-text-field'
                                }
                              >
                                {customAttributesType.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton href="#">
            <ReadMore />
          </IconButton>
        </Box> */}

                      {/* <Divider />

        <Divider /> */}
                      <CardActions
                        sx={{
                          justifyContent: 'flex-end',
                        }}
                      >
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
                          }}
                          onClick={handleAdd}
                        >
                          Add New Attribute
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </div>
                <Box sx={{ pt: 3 }}>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <br />
                </Box>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CustomAttributes;
