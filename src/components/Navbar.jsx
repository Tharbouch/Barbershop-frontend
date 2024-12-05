import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, logout } = useContext(AuthContext);

    return (
        <AppBar position="static" sx={{background:"black"}}>
            <Toolbar className="flex justify-between">
                <Typography
                    variant="h6"
                    className="cursor-pointer text-red-500"
                    onClick={() => navigate('/')}
                >
                    BarberShop
                </Typography>
                <Box className="flex items-center space-x-4">
                    {auth.isLoggedIn ? (
                        <>
                            {auth.role === 'barber' ? (
                                <Button
                                    color="inherit"
                                    onClick={() => navigate('/dashboard')}
                                    className="hover:bg-red-700"
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <Button
                                    color="inherit"
                                    onClick={() => navigate('/make-appointment')}
                                    className="hover:bg-red-700"
                                >
                                    Make Appointment
                                </Button>
                            )}
                            <Button
                                color="inherit"
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className="hover:bg-red-700"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/login')}
                                className="hover:bg-red-700"
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/signup')}
                                className="hover:bg-red-700"
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;