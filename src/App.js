import React, { useEffect } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Error from './pages/Error/Error.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { loginSuccess } from '../src/redux/actions/auth.actions.jsx';
import './sass/_Main.scss';

export default function App () {
    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isConnected);

    useEffect(() => {
      const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
      if (token) {
        dispatch(loginSuccess(token));
      }
    }, [dispatch]);
    

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route 
                    path='profile' 
                    element={isConnected ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </div>
    )  
}