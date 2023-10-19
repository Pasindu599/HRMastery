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
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';

const remainingDays = {
  annualDays: '30',
  casualDays: '48',
  maternityDays: '15',
  noPayDays: '10',
};

export const DayCount = (props) => {
  const { leavingType } = props;
  const { id } = useParams();
  const [remainingDays, setRemainingDays] = useState({
    annualDays: '',
    casualDays: '',
    maternityDays: '',
    noPayDays: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/emp/employee/leaving-count/${id}`)
      .then((res) => {
        setRemainingDays({
          annualDays: res.data.data[0].remaining_days,
          casualDays: res.data.data[1].remaining_days,
          maternityDays: res.data.data[2].remaining_days,
          noPayDays: res.data.data[3].remaining_days,
        });
      });
  }, []);

  return (
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
          <Typography
            gutterBottom
            variant="h"
            sx={{
              textAlign: 'center',
            }}
          >
            Annual Remaining Days
          </Typography>
          <Typography
            gutterBottom
            variant="h1"
            sx={{
              marginBottom: '0px',
              textAlign: 'center',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              textDecorationStyle: 'solid',
              color: '#600182',
              fontWeight: '500',
            }}
          >
            {remainingDays[leavingType]}
          </Typography>
          {/* <Typography color="text.secondary" variant="body2">
          {user.city} {user.country}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.timezone}
        </Typography> */}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
