import React from 'react';
import useUserStore from '../store/userStore';
import {Navigate} from 'react-router-dom';

const Protected = ({children}) => {
    const {isAuth} = useUserStore()
    return !isAuth ? <Navigate to='/signin'/> : children
};

export default Protected;