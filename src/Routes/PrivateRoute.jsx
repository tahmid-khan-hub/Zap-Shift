import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate , useLocation} from 'react-router';

const PrivateRoute = ({children}) => {

    const { user, loading } = UseAuth();
    const location = useLocation();

    if(loading) return <span className="loading loading-ring loading-xl"></span>

    if(!user) return <Navigate state={{from: location.pathname}} to='/login'></Navigate>

    return children;
};

export default PrivateRoute;