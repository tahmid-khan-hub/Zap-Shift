import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  // Fetch completed parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-parcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/completed-parcels/${user.email}`);
      return res.data;
    },
  });

  // Mutation to cash out parcel
  const { mutate: cashOut, isLoading: cashingOut } = useMutation({
    mutationFn: async ({ parcelId, email }) => {
      return await axiosSecure.patch(`/riders/cashout/${parcelId}`, { email });
    },
    onSuccess: () => {
      toast.success("Cash-out successful");
      queryClient.invalidateQueries(["completed-parcels"]);
    },
    onError: () => {
      toast.error("Cash-out failed");
    },
  });

  // Calculate rider earning based on district match
  const calculateEarning = (parcel) => {
    const cost = parseFloat(parcel.cost);
    const sameDistrict = parcel.senderServiceCenter === parcel.receiverServiceCenter;
    const percent = sameDistrict ? 0.8 : 0.3;
    return Math.round(cost * percent);
  };

  // Format deliveredAt date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return format(new Date(isoString), "PPpp");
  };

  if (isLoading) return <p>Loading completed deliveries...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Completed Deliveries</h2>
      <table className="table table-zebra w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Earned</th>
            <th>Delivered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.tracking_id}</td>
              <td>{parcel.title}</td>
              <td>
                {parcel.senderName} ({parcel.senderServiceCenter})
              </td>
              <td>
                {parcel.receiverName} ({parcel.receiverServiceCenter})
              </td>
              <td>{parcel.weight}kg</td>
              <td>৳{parcel.cost}</td>
              <td className="text-green-700 font-semibold">৳{calculateEarning(parcel)}</td>
              <td>{formatDate(parcel.deliveredAt)}</td>
              <td>
                {!parcel.cashed_out ? (
                  <button
                    onClick={() => cashOut({ parcelId: parcel._id, email: user.email })}
                    disabled={cashingOut}
                    className="btn btn-sm bg-blue-600 text-white"
                  >
                    {cashingOut ? "Processing..." : "Cash Out"}
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Cashed Out</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedDeliveries;
