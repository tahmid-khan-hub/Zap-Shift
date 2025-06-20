import React from "react";
import { Outlet } from "react-router";
import authimg from "../assets/authImage.png";
import ZapShiftLogo from "../pages/shared/ZapShiftLogo/ZapShiftLogo";

const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200 ">
      <div>
        <ZapShiftLogo></ZapShiftLogo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authimg} className="" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
