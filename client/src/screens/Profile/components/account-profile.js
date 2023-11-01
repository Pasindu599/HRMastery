import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// props ={
//     "id": 1,
//     "first_name": "Madalyn",
//     "last_name": "Dod",
//     "email": "mdod0@cocolog-nifty.com",
//     "gender": "Female",
//     "phone_number": "2148986860"
// }

export const AccountProfile = (props) => {
  const { id } = props;

  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('AccountProfile');

    async function fetchData() {
      await axios
        .get(`http://localhost:8000/emp/employee/profile-view/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.Status === true) {
            console.log(res);
            const employee_data = res.data.data;
            console.log(employee_data);

            setUser({
              avatar: '/assets/avatars/avatar-anika-visser.png',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <Card
        sx={{
          backgroundColor: '#F8E5FF',
          borderRadius: '50px',
          border: '1px solid rgba(73, 2, 106, 0.60)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            {/* <Typography gutterBottom variant="h5">
              {first_name} {last_name}
            </Typography> */}
            <Typography color="text.secondary" variant="body2">
              {id}
            </Typography>
            {/* <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography> */}
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};
