import React from "react";
import locationMerchantImg from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div className="hero border-2 rounded-4xl my-24 py-16 bg-[#03373D] overflow-hidden px-4 w-[96%] mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse items-center gap-10">
        <img
          src={locationMerchantImg}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[530px] object-contain"
          alt="Merchant Location"
        />
        <div className="mt-11 md:mt-0 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-gray-300">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <button className="text-lime-300 border-2 border-lime-300 py-2 px-6 hover:bg-lime-300 hover:text-black font-semibold rounded-4xl">Become a Merchant</button>
            <button className="text-lime-300 border-2 border-lime-300 py-2 px-6 hover:bg-lime-300 hover:text-black font-semibold rounded-4xl">Earn with Profast Courier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
