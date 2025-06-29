import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isPending,
    data: pendingRiders = [],
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) return <div className="p-6">Loading...</div>;

  const handleAction = async (id, status, email) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${
        status === "approved" ? "approve" : "reject"
      } this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#3085d6" : "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${
        status === "approved" ? "approve" : "reject"
      }!`,
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}/status`, { status , email});
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            `${status === "approved" ? "Approved" : "Rejected"}!`,
            `The rider has been ${status}.`,
            "success"
          );
          refetch();
          setSelectedRider(null);
        }
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Pending Rider Applications
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Bike Brand</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <span className="badge badge-warning text-white">
                    Pending
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-400 hover:text-red-500"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-3">Rider Details</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </p>
              <p>
                <strong>Reg. Number:</strong> {selectedRider.bikeRegNumber}
              </p>
              <p>
                <strong>Other Info:</strong> {selectedRider.otherInfo}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => handleAction(selectedRider._id, "approved", selectedRider.email)}
                className="btn btn-success btn-sm"
              >
                <FaCheckCircle className="mr-1" /> Approve
              </button>
              <button
                onClick={() => handleAction(selectedRider._id, "rejected", selectedRider.email)}
                className="btn btn-error btn-sm"
              >
                <FaTimesCircle className="mr-1" /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
