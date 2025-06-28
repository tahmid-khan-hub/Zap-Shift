import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const UseAxiosSecure = () => {

    const {user} = UseAuth()

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    },  error => {
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default UseAxiosSecure;