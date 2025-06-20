import React, { useState, useRef, useEffect } from 'react';
import postureProImg from "../../../assets/customer-top.png";
import quoteImg from "../../../assets/reviewQuote.png";

const testimonials = [
  {
    quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    name: "Awlad Hossin",
    title: "Senior Product Designer",
  },
  {
    quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    name: "Rasel Ahamed",
    title: "CTO",
  },
  {
    quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    name: "Nasir Uddin",
    title: "CEO",
  },
  {
    quote: "This is another great testimonial from a satisfied customer who improved their posture significantly with Posture Pro. Highly recommend!",
    name: "Jhon Doe",
    title: "Software Engineer",
  },
  {
    quote: "My back pain has reduced considerably since I started using this. It's comfortable and effective. A true lifesaver.",
    name: "Alice Smith",
    title: "Marketing Manager",
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null); 

  useEffect(() => {
    if (carouselRef.current) {
      const activeCard = carouselRef.current.children[activeIndex];
      if (activeCard) {
        const cardWidth = activeCard.offsetWidth;
        const carouselWidth = carouselRef.current.offsetWidth;
        const scrollLeft = activeCard.offsetLeft - (carouselWidth / 2) + (cardWidth / 2);

        carouselRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-[#f0f4f7] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img src={postureProImg} alt="Posture Pro Illustration" className="h-24 w-auto" />
        </div>
        <h2 className="text-4xl font-bold text-center text-[#333] mb-4">
          What our customers are saying
        </h2>
        <p className="text-lg text-center text-[#555] max-w-3xl mx-auto mb-12">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide py-4 -mx-4 md:-mx-8 lg:-mx-12" 
            style={{ scrollSnapType: 'x mandatory' }} 
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                style={{ scrollSnapAlign: 'center' }} 
              >
                <div
                  className={`bg-white rounded-lg shadow-md p-8 relative h-full flex flex-col justify-between transition-all duration-300 ease-in-out
                  ${index === activeIndex ? 'transform scale-105 shadow-xl border border-green-400' : 'transform scale-100 opacity-80'}
                  `}
                >
                  <div className="absolute top-4 left-4 text-gray-600">
                    <img src={quoteImg} alt="Quote" className="w-16 h-auto " />
                  </div>
                  <p className="text-lg text-[#333] mb-6 mt-11">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex-shrink-0">
                    </div>
                    <div>
                      <p className="font-semibold text-[#333]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#777]">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={goToPrevious}
              className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>

            <button
              onClick={goToNext}
              className="bg-green-500 p-3 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;