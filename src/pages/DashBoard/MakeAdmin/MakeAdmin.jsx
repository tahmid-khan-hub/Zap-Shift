import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

  // Query to fetch users by email
  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["search-users"],
    enabled: false, // We fetch manually after setting email
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
  });

  // Handle search form submit
  const onSubmit = async (data) => {
    setSearchEmail(data.email);
    refetch();
    reset(); // optional: reset form input
  };

  // Handle admin/user role toggle
  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/user/${id}/role`, { role });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `User role updated to ${role}`,
        });
        refetch();
      } 
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update role",
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email"
          {...register("email")}
          className="input input-bordered w-full max-w-sm"
        />
        <button type="submit" className="btn bg-green-400">
          Search
        </button>
      </form>

      {/* Search Result Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Created At</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleChange(user._id, "user")}
                        className="btn btn-error btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        className="btn btn-success btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
