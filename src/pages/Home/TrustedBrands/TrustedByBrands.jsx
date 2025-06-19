import Marquee from "react-fast-marquee";

import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import starplus from "../../../assets/brands/start.png";
import startpeople from "../../../assets/brands/start-people 1.png";
import randstad from "../../../assets/brands/randstad.png";

const brands = [casio, amazon, moonstar, starplus, startpeople, randstad];

export default function TrustedByBrands() {
  return (
    <section className="bg-[#f1f4f5] py-12 my-12 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-[#003B3B]">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`brand-${index}`}
            className="h-10 mx-8 object-contain"
          />
        ))}
      </Marquee>

      <div className="border-t border-dashed border-[#0f5454] mt-10 mx-auto w-[90%]"></div>
    </section>
  );
}
