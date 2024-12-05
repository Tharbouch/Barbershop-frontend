import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const servicesList = [
    { name: 'Haircut', price: 20 },
    { name: 'Beard Trim', price: 15 },
    { name: 'Shave', price: 15 },
    { name: 'Hair Coloring', price: 40 },
    { name: 'Hair Styling', price: 25 },
    { name: 'Facial', price: 30 },
    { name: 'Hair Treatment', price: 35 },
];

const fetchBarbers = async () => {
    const res = await axios.get('/users/barbers');
    return res.data;
}

const BookAppointment = () => {
    const [form, setForm] = useState({ barberId: '', date: '' });
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const { data: barbers, isLoading, error } = useQuery({
        queryKey: ['barbers'],
        queryFn: fetchBarbers,
    });

    useEffect(() => {
        const total = selectedServices.reduce((acc, service) => {
            const serviceObj = servicesList.find(s => s.name === service);
            return acc + (serviceObj ? serviceObj.price : 0);
        }, 0);
        setTotalPrice(total);
    }, [selectedServices]);

    const handleServiceChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedServices([...selectedServices, name]);
        } else {
            setSelectedServices(selectedServices.filter(service => service !== name));
        }
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            alert('Please select at least one service.');
            return;
        }
        try {
            await axios.post('/appointments', {
                ...form,
                services: selectedServices,
                totalPrice,
            });
            alert('Appointment booked successfully!');
            navigate('/');
        } catch(err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Booking failed');
        }
    }

    if (isLoading) return <div className="text-center mt-12">Loading barbers...</div>;
    if (error) return <div className="text-center mt-12 text-red-500">Error loading barbers</div>;

    return (
        <Container maxWidth="sm" className="mt-12 bg-white shadow-lg rounded-lg p-8">
            <Typography variant="h4" className="text-center text-red-500 mb-6">
                Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormControl fullWidth required className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <InputLabel id="barber-label">Select Barber</InputLabel>
                    <Select
                        labelId="barber-label"
                        name="barberId"
                        value={form.barberId}
                        onChange={handleChange}
                        label="Select Barber"
                    >
                        {barbers.map(barber => (
                            <MenuItem key={barber._id} value={barber._id}>
                                {barber.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="text-gray-700">Select Services</FormLabel>
                    <FormGroup>
                        {servicesList.map(service => (
                            <FormControlLabel
                                key={service.name}
                                control={
                                    <Checkbox
                                        checked={selectedServices.includes(service.name)}
                                        onChange={handleServiceChange}
                                        name={service.name}
                                        color="primary"
                                    />
                                }
                                label={`${service.name} ($${service.price})`}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
                <Typography variant="h6" className="text-right text-gray-800">
                    Total Price: ${totalPrice}
                </Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    Book Appointment
                </Button>
            </form>
        </Container>
    );
}

export default BookAppointment;