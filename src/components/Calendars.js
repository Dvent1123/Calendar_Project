import * as React from 'react';
import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import calendars from '../data/calendars'
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const Calendars = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? null)
    
    const navigate = useNavigate();

      const navigateToCalendar = (id) => {
        navigate(`/calendar/user/${id}`);
      };
    //console.log(user.calendarIDs)
    //TODO
    //Get calendar IDs from user and use filter with map to render the users maps
  return (
    <Container maxWidth="lg" maxheight="lg" sx={{ paddingTop: 8}}>
        <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={6}>
            {
                calendars.map((calendar, index) => {
                    return <Box key={index} gridColumn="span 4">
                        <Item>
                            <Card>
                            <CalendarMonthOutlinedIcon sx={{ color: calendar.color, fontSize: 80}}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {calendar.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                This calendar has 6 recurring jobs this week. 3 houses to clean today.
                                42 houses to clean this month.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "center"}}>
                                <Button onClick={() => navigateToCalendar(calendar.calendarID)} size="small">See Calendar</Button>
                            </CardActions>
                            </Card>
                        </Item>
                    </Box>
                })
            }
        </Box>
        </Box>
    </Container>
  );
}
