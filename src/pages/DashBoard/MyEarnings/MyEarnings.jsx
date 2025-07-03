import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";

const MyEarnings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  // Fetch completed parcels for this rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-parcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/completed-parcels/${user.email}`);
      return res.data;
    },
  });

  // Calculate earning for a parcel
  const calculateEarning = (parcel) => {
    const cost = parseFloat(parcel.cost);
    const sameDistrict = parcel.senderServiceCenter === parcel.receiverServiceCenter;
    const percent = sameDistrict ? 0.8 : 0.3;
    return cost * percent;
  };

  // Total earnings (sum all completed parcels)
  const totalEarned = parcels.reduce((sum, p) => sum + calculateEarning(p), 0);

  // Total cashed out (sum parcels with cashed_out: true)
  const totalCashedOut = parcels
    .filter((p) => p.cashed_out)
    .reduce((sum, p) => sum + calculateEarning(p), 0);

  // Balance (earned but not cashed out)
  const balance = totalEarned - totalCashedOut;

  if (isLoading) return <p>Loading your earnings...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Earnings</h2>

      <div className="mb-4 text-lg">
        <p>
          <strong>Total Earned:</strong> ৳{totalEarned.toFixed(2)}
        </p>
        <p>
          <strong>Total Cashed Out:</strong> ৳{totalCashedOut.toFixed(2)}
        </p>
        <p>
          <strong>Balance:</strong> ৳{balance.toFixed(2)}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Completed Deliveries</h3>

      <table className="table table-zebra w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Earned</th>
            <th>Cashed Out</th>
            <th>Delivered At</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => {
            const earned = calculateEarning(parcel);
            return (
              <tr key={parcel._id}>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.title}</td>
                <td>৳{earned.toFixed(2)}</td>
                <td>{parcel.cashed_out ? "Yes" : "No"}</td>
                <td>{parcel.deliveredAt ? new Date(parcel.deliveredAt).toLocaleString() : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyEarnings;
