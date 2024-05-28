import React, { useEffect } from 'react';
import { Route, Routes,} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { loginSuccess } from '../src/redux/actions/auth.actions.jsx';
import './sass/_Main.scss';

export default function App () {
    const dispatch = useDispatch();

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
                    element={<Profile />} 
                />
            </Routes>
            <Footer />
        </div>
    )  
}