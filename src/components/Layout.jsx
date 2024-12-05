import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, backgroundImage }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main
                className="flex-grow bg-cover bg-center bg-no-repeat w-full"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {children}
            </main>
            <footer className="bg-black text-white text-center py-4">
                © {new Date().getFullYear()} BarberShop. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
