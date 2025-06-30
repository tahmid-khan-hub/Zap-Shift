import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const UseAxiosSecure = () => {

    const {user, logOut} = UseAuth()
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    },  error => {
        return Promise.reject(error)
    })


    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log('inside interceptors error',error);
        const status = error.status;

        if(status === 403){
            navigate('/forbidden')
        }
        else if(status === 401) {
            logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => {
                console.log(err);
            })
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default UseAxiosSecure;