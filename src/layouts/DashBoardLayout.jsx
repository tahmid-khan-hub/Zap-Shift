import React from "react";
import Myparcels from "../pages/DashBoard/Myparcels";
import ZapShiftLogo from "../pages/shared/ZapShiftLogo/ZapShiftLogo";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBox,
  FaMoneyCheckAlt,
  FaMapMarkedAlt,
  FaUserEdit,
} from "react-icons/fa";
import { FaMotorcycle, FaHourglassHalf } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import UseUserRole from "../hooks/UseUserRole";

const DashBoardLayout = () => {
  const { role, roleLoading } = UseUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">DashBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ZapShiftLogo></ZapShiftLogo>
          <li>
            <NavLink to="/">
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels">
              <FaBox className="mr-2" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaMoneyCheckAlt className="mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track">
              <FaMapMarkedAlt className="mr-2" /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit className="mr-2" /> Update Profile
            </NavLink>
          </li>

          {!roleLoading && role === 'admin' &&
            <>
              <li>
                <NavLink to="/dashboard/activeRiders">
                  <FaMotorcycle className="mr-2" /> Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pendingRiders">
                  <FaHourglassHalf className="mr-2" /> Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="mr-2" /> Make Admin
                </NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
