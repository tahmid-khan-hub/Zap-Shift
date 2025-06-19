import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import TrustedByBrands from '../TrustedBrands/TrustedByBrands';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <TrustedByBrands></TrustedByBrands>
        </div>
    );
};

export default Home;