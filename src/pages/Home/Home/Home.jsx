import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../Services/ServicesSection';
import TrustedByBrands from '../TrustedBrands/TrustedByBrands';
import SpecialService from '../SpecialService/SpecialService';
import BeMerchant from '../BeMerchant/BeMerchant';
import Delivery from '../Delivery/Delivery';
import FaQ from '../FaQ/FaQ';
import TestimonialCarousel from '../TestimonialCarousel/TestimonialCarousel';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Delivery></Delivery>
            <ServicesSection></ServicesSection>
            <TrustedByBrands></TrustedByBrands>
            <SpecialService></SpecialService>
            <BeMerchant></BeMerchant>
            <TestimonialCarousel></TestimonialCarousel>
            <FaQ></FaQ>
        </div>
    );
};

export default Home;