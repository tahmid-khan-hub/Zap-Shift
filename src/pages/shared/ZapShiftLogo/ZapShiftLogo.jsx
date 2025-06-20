import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const ZapShiftLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img className="mb-1" src={logo} alt="" />
        <p className="text-3xl -ml-3 font-extrabold">ZapShift</p>
      </div>
    </Link>
  );
};

export default ZapShiftLogo;
