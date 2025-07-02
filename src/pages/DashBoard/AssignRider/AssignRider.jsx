import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const AssignRider = () => {
    const axiosSecure = UseAxiosSecure()
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?payment_status=paid&delivery_status=not_collected");
      return res.data.filter(
        (parcel) =>
          parcel.payment_status === "paid" &&
          parcel.delivery_status === "not_collected"
      );
    },
  });

  const handleAssign = (parcelId) => {
    // You can trigger modal or assign directly here
    console.log("Assign rider to:", parcelId);
  };

  if (isLoading) return <p className="p-4">Loading parcels...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load parcels.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Assign Rider</h2>
      {parcels.length === 0 ? (
        <p>No parcels to assign.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Parcel ID</th>
                <th className="px-4 py-2 border">Receiver</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Delivery Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{parcel._id}</td>
                  <td className="px-4 py-2 border">{parcel.receiverName}</td>
                  <td className="px-4 py-2 border">{parcel.receiverAddress}</td>
                  <td className="px-4 py-2 border">{parcel.payment_status}</td>
                  <td className="px-4 py-2 border">{parcel.delivery_status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleAssign(parcel._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700"
                    >
                      <FaUserPlus /> Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
