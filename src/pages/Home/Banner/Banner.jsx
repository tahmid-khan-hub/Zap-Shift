import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/banner1.png"
import img2 from "../../../assets/banner/banner2.png"
import img3 from "../../../assets/banner/banner3.png"
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={img1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={img2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={img3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
