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

const remainingDays = {
  annualDays: '30',
  casualDays: '48',
  maternityDays: '15',
  noPayDays: '10',
};

export const DayCount = (props) => {
  const { leavingType } = props;
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
