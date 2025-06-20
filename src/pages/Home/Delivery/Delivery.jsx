import React from "react";
import { FaCarSide, FaMoneyBillWave } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { MdBusinessCenter } from "react-icons/md";

const Delivery = () => {
  const deliveryDetails = [
    {
      icon: <FaCarSide className="text-4xl " />,
      title: "Booking Pick & Drop",
      description:
        "Easily book pickup and drop-off for your parcels right from your doorstep — fast, flexible, and convenient.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl " />,
      title: "Cash On Delivery",
      description:
        "Enjoy secure and hassle-free cash-on-delivery options, making payments only after your parcel is delivered.",
    },
    {
      icon: <BsShop className="text-4xl " />,
      title: "Delivery Hub",
      description:
        "Access our strategically located delivery hubs to send or receive packages at your convenience.",
    },
    {
      icon: <MdBusinessCenter className="text-4xl " />,
      title: "Booking SME & Corporate",
      description:
        "Tailored delivery solutions for SMEs and corporate clients — reliable, scalable, and cost-effective.",
    },
  ];

  return (
    <div className="my-24 py-12 px-4 lg:px-20 bg-[#f4f7f9]">
      <div className=" mb-10">
        <h2 className="text-4xl font-bold">How it Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {deliveryDetails.map((delivery, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-md text-left bg-white hover:shadow-lg transition"
          >
            <div className="mb-4">{delivery.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{delivery.title}</h3>
            <p className="text-gray-600 text-sm">{delivery.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;
