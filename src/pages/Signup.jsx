import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/signup', form); 
            
            alert('Signup successful! Please log in.');
            navigate('/login'); 

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Signup failed');
        }
    };

    return (
        <Container maxWidth="sm" className="mt-12 bg-white shadow-lg rounded-lg p-8">
            <Typography variant="h4" gutterBottom className="text-center text-red-500">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-6">
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <FormControl fullWidth margin="normal" className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        label="Role"
                        required
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="barber">Barber</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    Sign Up
                </Button>
            </form>
        </Container>
    );
}

export default Signup;