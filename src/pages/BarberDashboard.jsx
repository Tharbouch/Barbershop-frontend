// src/pages/BarberDashboard.js
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/appointments/barber', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

const BarberDashboard = () => {
    const { data: appointments, isLoading, error } = useQuery(['barberAppointments'], fetchAppointments);

    if (isLoading) return <div>Loading appointments...</div>;
    if (error) return <div>Error fetching appointments</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>My Appointments</Typography>
            <List>
                {appointments.map(app => (
                    <ListItem key={app._id}>
                        <ListItemText
                            primary={`${app.service} with ${app.user.name}`}
                            secondary={`Date: ${new Date(app.date).toLocaleString()} - Status: ${app.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default BarberDashboard;
