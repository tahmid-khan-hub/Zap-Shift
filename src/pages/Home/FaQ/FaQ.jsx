import React, { useState } from "react";

const FaQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How can I schedule a parcel pickup?",
      answer:
        "You can schedule a pickup through our app or website by selecting your preferred time and location.",
    },
    {
      question: "Do you offer real-time tracking?",
      answer:
        "Yes, every delivery comes with real-time tracking so you can monitor your parcel's journey.",
    },
    {
      question: "What payment methods are accepted for delivery?",
      answer:
        "We accept cash on delivery, digital wallet payments, and major credit/debit cards.",
    },
    {
      question: "Can I cancel a delivery after booking?",
      answer:
        "Yes, you can cancel your delivery up to 30 minutes before the scheduled pickup time.",
    },
    {
      question: "Do you support bulk or corporate deliveries?",
      answer:
        "Absolutely! We provide dedicated support and pricing for SMEs and corporate clients.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="px-4 lg:px-24 my-20 bg-[#f4f7f9] py-11">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Find answers to common questions about our delivery services,
          bookings, and more.
        </p>
      </div>

      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`collapse collapse-arrow border border-base-300 mb-4 ${
            activeIndex === index ? "bg-lime-100" : "bg-base-100"
          }`}
        >
          <input
            type="checkbox"
            checked={activeIndex === index}
            onChange={() => toggleAccordion(index)}
          />
          <div className="collapse-title font-semibold text-base">
            {faq.question}
          </div>
          <div className="collapse-content text-sm">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaQ;
