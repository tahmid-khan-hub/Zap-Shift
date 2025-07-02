import React from "react";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleFetching,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleFetching, refetch };
};

export default UseUserRole;
