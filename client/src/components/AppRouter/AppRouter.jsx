import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import Registration from '../Registration/Registration';
import Header from '../Header/Header';
export default function AppRouter() {
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <div>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
}
