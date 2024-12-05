import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token) {
            if (userRole === 'barber') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [navigate]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', form); 
            const token = res.data.token;
            localStorage.setItem('token', token);

            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.role;
            localStorage.setItem('role', role);

            login(role,token);

            if (role === 'barber') {
                navigate('/dashboard'); 
            } else {
                navigate('/'); 
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm" className="mt-12 bg-white shadow-lg rounded-lg p-8">
            <Typography variant="h4" gutterBottom className="text-center text-red-500">
                Login
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    Login
                </Button>
            </form>
            <Typography className="mt-4 text-center">
                Don't have an account?{' '}
                <Link to="/signup" className="text-red-500 hover:underline">
                    Signup
                </Link>
            </Typography>
        </Container>
    );
}

export default Login;
