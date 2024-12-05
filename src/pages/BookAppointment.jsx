import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchBarbers = async () => {
    const res = await axios.get('http://localhost:5000/api/users/barbers'); // You'll need to create this endpoint
    return res.data;
}

const BookAppointment = () => {
    const [form, setForm] = useState({ barberId: '', date: '', service: '' });
    const navigate = useNavigate();

    const { data: barbers, isLoading } = useQuery(['barbers'], fetchBarbers);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/appointments', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Appointment booked!');
            navigate('/');
        } catch(err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Booking failed');
        }
    }

    if (isLoading) return <div>Loading barbers...</div>;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Book an Appointment</Typography>
            <form onSubmit={handleSubmit}>
                <Select
                    name="barberId"
                    value={form.barberId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    {barbers.map(barber => (
                        <MenuItem key={barber._id} value={barber._id}>{barber.name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Date and Time"
                    name="date"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Service"
                    name="service"
                    fullWidth
                    margin="normal"
                    value={form.service}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Book</Button>
            </form>
        </Container>
    );
}

export default BookAppointment;
