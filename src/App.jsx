import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import BarberDashboard from './pages/BarberDashboard';
import PrivateRoute from './components/PrivateRoute';
import backgroundImage from './assets/background.jpg';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout backgroundImage={backgroundImage}>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/make-appointment"
                    element={
                        <PrivateRoute roles={['user']}>
                            <BookAppointment />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute roles={['barber']}>
                            <BarberDashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Layout>

        </Router>
    </QueryClientProvider>
  );
}

export default App;
