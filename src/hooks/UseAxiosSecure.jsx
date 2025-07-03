import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("inside interceptors error", error);
      const status = error.response?.status;

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
