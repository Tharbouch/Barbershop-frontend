import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', form);
            localStorage.setItem('token', res.data.token);
            // Decode token to get role (you might want to use a library like jwt-decode)
            const payload = JSON.parse(atob(res.data.token.split('.')[1]));
            localStorage.setItem('role', payload.role);
            navigate('/');
        } catch(err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Signup failed');
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" name="name" fullWidth margin="normal" value={form.name} onChange={handleChange} required />
                <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required />
                <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required />
                <Select name="role" value={form.role} onChange={handleChange} fullWidth margin="normal">
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="barber">Barber</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
            </form>
        </Container>
    );
}

export default Signup;
