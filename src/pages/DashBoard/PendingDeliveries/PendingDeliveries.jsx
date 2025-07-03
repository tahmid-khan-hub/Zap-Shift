import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import { toast } from "react-hot-toast";

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["pending-parcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/parcels/${user.email}`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({ parcelId, newStatus, email }) => {
      return await axiosSecure.patch(`/parcels/update-status/${parcelId}`, {
        status: newStatus,
        email,
      });
    },
    onSuccess: (_, { newStatus }) => {
      toast.success(`Marked as ${newStatus}`);
      queryClient.invalidateQueries(["pending-parcels"]);
    },
    onError: (_, { newStatus }) => {
      toast.error(`Failed to mark as ${newStatus}`);
    },
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    mutate({ parcelId, newStatus, email: user.email });
  };

  // table UI continues below...

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Deliveries</h2>
      <table className="table table-zebra w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.tracking_id}</td>
              <td>{parcel.title}</td>
              <td>
                {parcel.senderName} ({parcel.senderContact})
              </td>
              <td>
                {parcel.receiverName} ({parcel.receiverContact})
              </td>
              <td>{parcel.delivery_status}</td>
              <td>{parcel.weight}kg</td>
              <td>৳{parcel.cost}</td>
              <td className="space-x-2">
                {parcel.delivery_status === "assigned" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel._id, "picked_up")}
                    className="btn btn-sm bg-yellow-500 text-white"
                  >
                    Mark Picked Up
                  </button>
                )}
                {parcel.delivery_status === "picked_up" && (
                  <button
                    onClick={() => handleStatusUpdate(parcel._id, "delivered")}
                    className="btn btn-sm bg-green-600 text-white"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingDeliveries;
