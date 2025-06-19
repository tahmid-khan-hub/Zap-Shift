import React from "react";
// components/ServicesCard.jsx
import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandshake,
  FaUndoAlt,
} from "react-icons/fa";

const iconMap = {
  "Express & Standard Delivery": (
    <FaShippingFast className="text-3xl text-[#003B3B]" />
  ),
  "Nationwide Delivery": <FaGlobeAsia className="text-3xl text-[#003B3B]" />,
  "Fulfillment Solution": <FaWarehouse className="text-3xl text-[#003B3B]" />,
  "Cash on Home Delivery": (
    <FaMoneyBillWave className="text-3xl text-[#003B3B]" />
  ),
  "Corporate Service / Contract In Logistics": (
    <FaHandshake className="text-3xl text-[#003B3B]" />
  ),
  "Parcel Return": <FaUndoAlt className="text-3xl text-[#003B3B]" />,
};

export default function ServicesCard({ title, description }) {
  const isHighlighted = title === "Nationwide Delivery";

  return (
    <div
      className={`rounded-xl p-6 text-black flex flex-col items-center text-center shadow-md transition-transform duration-300 hover:scale-[1.02] ${
        isHighlighted ? "bg-lime-200" : "bg-white"
      }`}
    >
      <div className="bg-lime-100 p-3 rounded-full mb-4">{iconMap[title]}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#003B3B]">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}
