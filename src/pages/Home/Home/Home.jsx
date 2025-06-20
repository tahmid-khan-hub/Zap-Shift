import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import TrustedByBrands from '../TrustedBrands/TrustedByBrands';
import SpecialService from '../SpecialService/SpecialService';
import BeMerchant from '../BeMerchant/BeMerchant';
import Delivery from '../Delivery/Delivery';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Delivery></Delivery>
            <ServicesSection></ServicesSection>
            <TrustedByBrands></TrustedByBrands>
            <SpecialService></SpecialService>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;