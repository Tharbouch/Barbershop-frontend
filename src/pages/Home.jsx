import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token) {
            setIsLoggedIn(true);
            setRole(userRole);
        } else {
            setIsLoggedIn(false);
            setRole('');
        }
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
        >
            <div className="max-w-xl w-full p-8 bg-white bg-opacity-80 shadow-lg rounded-lg text-center">
                <Typography variant="h3" className="font-bold text-red-600 mb-4">
                    Welcome to BarberShop
                </Typography>
                <Typography variant="h6" className="text-gray-700 mb-6">
                    Your place for professional barber services
                </Typography>
                {isLoggedIn && role !== 'barber' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/make-appointment')}
                        className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                    >
                        Make Appointment
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Home;