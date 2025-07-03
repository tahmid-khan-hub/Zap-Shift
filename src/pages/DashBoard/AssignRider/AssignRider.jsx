import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import Modal from "react-modal";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

Modal.setAppElement("#root"); // important for accessibility

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState(null);

  // Load parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data.filter(
        (parcel) =>
          parcel.payment_status === "paid" &&
          parcel.delivery_status === "not_collected"
      );
    },
  });

  // Load riders filtered by district of selected parcel's senderServiceCenter
  const {
    data: riders = [],
    refetch: refetchRiders,
    isFetching: ridersLoading,
  } = useQuery({
    queryKey: ["riders", selectedParcel?.senderServiceCenter],
    queryFn: async () => {
      if (!selectedParcel) return [];
      const district = selectedParcel.senderServiceCenter;
      const res = await axiosSecure.get(
        `/riders/available?district=${district}`
      );
      return res.data;
    },
    enabled: !!selectedParcel, // only fetch when parcel selected
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setSelectedRiderId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
    setSelectedRiderId(null);
  };

  const handleAssignConfirm = async () => {
    if (!selectedRiderId || !selectedParcel) {
      alert("Please select a rider");
      return;
    }

    const selectedRider = riders.find((r) => r._id === selectedRiderId);
    const riderEmail = selectedRider?.email;

    try {
      await axiosSecure.post("/riders/assign-rider", {
        parcelId: selectedParcel._id,
        riderId: selectedRiderId,
        riderEmail,
      });
      alert("Rider assigned successfully!");
      closeModal();
    } catch (error) {
      alert("Failed to assign rider");
      console.error("Assign error:", error.response?.data || error.message);
    }
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
                      onClick={() => openModal(parcel)}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Assign Rider Modal"
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h3 className="text-xl font-semibold mb-4">
          Assign Rider for Parcel: {selectedParcel?._id}
        </h3>
        {ridersLoading ? (
          <p>Loading riders...</p>
        ) : riders.length === 0 ? (
          <p>
            No riders available in district:{" "}
            {selectedParcel?.senderServiceCenter}
          </p>
        ) : (
          <div className="max-h-64 overflow-y-auto mb-4 border rounded p-2">
            {riders.map((rider) => (
              <label
                key={rider._id}
                className="flex items-center gap-2 cursor-pointer mb-2"
              >
                <input
                  type="radio"
                  name="selectedRider"
                  value={rider._id}
                  checked={selectedRiderId === rider._id}
                  onChange={() => setSelectedRiderId(rider._id)}
                />
                <span>
                  {rider.name} - {rider.district}
                </span>
              </label>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignConfirm}
            disabled={!selectedRiderId}
            className={`px-4 py-2 text-white rounded ${
              selectedRiderId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Confirm Assign
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AssignRider;
