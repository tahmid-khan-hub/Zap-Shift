import React from "react";
import trackingImg from "../../../assets/trackingImg.png";
import deliveryImg from "../../../assets/deliveryImg.png";

const services = [
  {
    img: trackingImg,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    img: deliveryImg,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: deliveryImg,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const SpecialService = () => {
  return (
    <div className="bg-[#f4f7f9] py-16 px-4 md:px-8 lg:px-20 my-24">
      <div className="space-y-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-md"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-32 md:w-40 object-contain"
            />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#012b27] mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialService;
