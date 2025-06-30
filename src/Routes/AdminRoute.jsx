import React from 'react';
import UseAuth from '../hooks/UseAuth';
import UseUserRole from '../hooks/UseUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = UseAuth()
    const {role, roleLoading} = UseUserRole()
    const location = useLocation()

    if(loading || roleLoading) return <span className="loading loading-ring loading-xl"></span>

    if(!user || role !== 'admin') return <Navigate state={{from: location.pathname}} to="/forbidden"></Navigate>


    return children;
};

export default AdminRoute;