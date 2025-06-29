import React, { useState } from "react";
import { FaBan, FaSearch } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: activeRiders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const filteredRiders = activeRiders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeactivate = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Deactivate ${name}?`,
      text: "This rider will be moved to deactivated status.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, deactivate!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}/status`, {
          status: "deactivated",
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Deactivated!", `${name} has been deactivated.`, "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (isPending) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Active Riders</h2>
        <div className="flex items-center gap-2">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered input-sm w-52"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Deactivate</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length ? (
              filteredRiders.map((rider) => (
                <tr key={rider._id}>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.phone}</td>
                  <td>{rider.bikeBrand}</td>
                  <td>
                    <span className="badge badge-success text-white">
                      Active
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id, rider.name)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      <FaBan className="mr-1" /> Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
