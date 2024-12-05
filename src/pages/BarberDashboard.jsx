import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

// Fetch appointments
const fetchAppointments = async () => {
    try {
        const res = await axios.get('/appointments/barber');
        return res.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
}

// Update appointment status
const updateAppointmentStatus = async ({ id, status }) => {
    try {
        const res = await axios.put(`/appointments/${id}`, { status });
        return res.data;
    } catch (error) {
        console.error("Error updating status:", error);
        throw error;
    }
}

const BarberDashboard = () => {
    const [status, setStatus] = useState(null);
    const { data: appointments, isLoading, error } = useQuery({
        queryKey: ['barberAppointments'],
        queryFn: fetchAppointments,
    });

    const queryClient = useQueryClient();

    // Mutation for updating the status
    const mutation = useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(['barberAppointments']);
        }
    });

    const handleChangeStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        mutation.mutate({ id, status: newStatus });
    }

    if (isLoading) return <div className="text-center mt-12"><CircularProgress /> Loading appointments...</div>;
    if (error) return <div className="text-center mt-12 text-red-500">Error fetching appointments</div>;

    return (
        <Container className="mt-12">
            <Typography variant="h4" className="text-center text-red-500 mb-6">
                My Appointments
            </Typography>
            <List className="space-y-4">
                {appointments.map(app => (
                    <ListItem key={app._id} className="bg-white p-4 rounded-lg shadow-md">
                        <ListItemText
                            primary={`Services: ${app.services.join(', ')} | Total: $${app.totalPrice}`}
                            secondary={`Client: ${app.user.name} | Date: ${new Date(app.date).toLocaleString()} | Status: ${app.status}`}
                            className="text-gray-800"
                        />
                        {app.status === 'pending' ?
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleChangeStatus(app._id, app.status)}
                            >
                                Mark as Completed
                            </Button>
                            :
                            <></>
                        }

                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default BarberDashboard;
