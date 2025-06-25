import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaEye, FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Myparcels = () => {
  const { user } = UseAuth()
  const axiosSecure = UseAxiosSecure()
  const queryClient = useQueryClient();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcel", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const getCost = (type) => (type === "document" ? 50 : 100);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            queryClient.invalidateQueries(["my-parcel", user.email]); // refresh data
          }
          refetch()
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the parcel.", error);
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Title</th>
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
              <td>{parcel.title}</td>
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
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error text-white"
                >
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
