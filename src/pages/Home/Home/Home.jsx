import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import TrustedByBrands from '../TrustedBrands/TrustedByBrands';
import SpecialService from '../SpecialService/SpecialService';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <TrustedByBrands></TrustedByBrands>
            <SpecialService></SpecialService>
        </div>
    );
};

export default Home;