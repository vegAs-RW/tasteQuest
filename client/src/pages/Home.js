import React from 'react';
import HomeCards from '../components/HomeCards';
import Navbar from '../components/Navbar';
import HomeBackground from '../components/HomeBackground';

const home = () => {
    return (
        <div>
            <Navbar />
           <HomeBackground />
            <HomeCards/>
        </div>
    );
};

export default home;