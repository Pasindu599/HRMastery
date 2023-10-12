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
import { useState } from 'react';

// props ={
//     "id": 1,
//     "first_name": "Madalyn",
//     "last_name": "Dod",
//     "email": "mdod0@cocolog-nifty.com",
//     "gender": "Female",
//     "phone_number": "2148986860"
// }

export const AccountProfile = (props) => {
  const { employee_id, first_name, last_name } = props.children;

  const [user, setUser] = useState({
    avatar: '/assets/avatars/avatar-anika-visser.png',
    // city: 'Los Angeles',
    // country: 'USA',
    // jobTitle: 'Senior Developer',
    name: `${first_name} ${last_name}`,
    // timezone: 'GTM-7',
  });
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
            <Typography gutterBottom variant="h5">
              {first_name} {last_name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {employee_id}
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
