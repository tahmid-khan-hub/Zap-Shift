import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { FaEye, FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";

const Myparcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcel", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const getCost = (type) => {
    return type === "document" ? 50 : 100;
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // e.g., 25/06/2025
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td className="capitalize">
                {parcel.type === "document" ? "Document" : "Non-doc"}
              </td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>{getCost(parcel.type)}৳</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-info text-white">
                  <FaEye />
                </button>
                {parcel.payment_status === "unpaid" && (
                  <button className="btn btn-sm btn-warning text-white">
                    <FaMoneyCheckAlt />
                  </button>
                )}
                <button className="btn btn-sm btn-error text-white">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Myparcels;